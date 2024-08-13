import { Request, Response } from 'express';
import { AuthService } from '../services';
import {
  AccessRequestDto,
  HttpStatusCode,
  LoginRequestDto,
  TErrorKeys,
} from '../types';
import { handleLoginError } from '../utils';
import { AccessRequest } from '../models';

class AuthController {
  async login(
    req: Request<{}, {}, LoginRequestDto>,
    res: Response,
  ): Promise<Response> {
    try {
      const token = await AuthService.login(req.body);

      res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000,
        sameSite: 'strict',
      });

      return res.sendStatus(HttpStatusCode.OK);
    } catch (error) {
      console.error('Error logging in:', error);

      return handleLoginError(error, res, req);
    }
  }

  async logout(req: Request, res: Response): Promise<Response> {
    res.clearCookie('authToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.sendStatus(HttpStatusCode.OK);
  }

  async getIsAuthenticated(req: Request, res: Response): Promise<Response> {
    return res.sendStatus(HttpStatusCode.OK);
  }

  async requestAccess(
    req: Request<{}, {}, AccessRequestDto>,
    res: Response,
  ): Promise<Response> {
    try {
      const { email } = req.body;
      const requestExists = await AccessRequest.findOne({ email });

      if (requestExists) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          errorKey: TErrorKeys.CANT_PROCESS_ACCESS_REQUEST,
          detailedMessage: req.t(TErrorKeys.CANT_PROCESS_ACCESS_REQUEST),
        });
      }

      const request = new AccessRequest({ email });
      await request.save();

      console.log('Access request created successfully');
      return res.sendStatus(HttpStatusCode.CREATED);
    } catch (error) {
      console.error('Error creating access request:', error);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        errorKey: TErrorKeys.ACCESS_REQUEST_FAILED,
        detailedMessage: req.t(TErrorKeys.ACCESS_REQUEST_FAILED),
      });
    }
  }
}
export default new AuthController();
