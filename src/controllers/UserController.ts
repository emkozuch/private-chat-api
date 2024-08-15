import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { UsersService } from '../services';
import {
  BaseError,
  GetUserProfileResponseDto,
  HttpStatusCode,
  TErrorKeys,
} from '../types';
import { sendInternalServerError } from '../utils';

class UserController {
  async getUserProfile(
    req: Request,
    res: Response<GetUserProfileResponseDto | BaseError>,
  ): Promise<Response> {
    const userId = (req.user as JwtPayload).id;

    try {
      const profileData = await UsersService.getProfileDataById(userId);

      if (profileData) {
        return res.status(HttpStatusCode.OK).json(profileData);
      } else {
        throw new Error(TErrorKeys.USER_NOT_FOUND);
      }
    } catch (error) {
      if (error instanceof Error) {
        return res.status(HttpStatusCode.NOT_FOUND).json({
          errorKey: TErrorKeys.USER_NOT_FOUND,
          detailedMessage: req.t(TErrorKeys.USER_NOT_FOUND),
        });
      }
      return sendInternalServerError(req, res);
    }
  }
}

export default new UserController();
