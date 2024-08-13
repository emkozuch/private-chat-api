import { Request, Response } from 'express';
import { AuthService } from '../services';
import { HttpStatusCode, LoginRequestDto } from '../types';
import { handleLoginError } from '../utils';

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

  async getIsAuthenticated(req: Request, res: Response): Promise<Response> {
    return res.sendStatus(HttpStatusCode.OK);
  }
}
export default new AuthController();
