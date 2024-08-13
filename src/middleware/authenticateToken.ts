import { NextFunction, Request, Response } from 'express';
import passportInstance from '../config/passportInstance';
import { IUser } from '../models/User';
import { BaseError, HttpStatusCode, TErrorKeys } from '../types';

export const authenticateToken = (
  req: Request,
  res: Response<any | BaseError>,
  next: NextFunction,
) => {
  const token =
    req.cookies['authToken'] || req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(HttpStatusCode.UNAUTHORIZED).send(false);

  passportInstance.authenticate(
    'jwt',
    { session: false },
    (err: Error, user: IUser) => {
      if (err) {
        return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
          errorKey: TErrorKeys.INTERNAL_SERVER_ERROR,
          detailedMessage: req.t(TErrorKeys.INTERNAL_SERVER_ERROR),
        });
      }
      if (!user) {
        return res.status(HttpStatusCode.UNAUTHORIZED).json({
          errorKey: TErrorKeys.UNAUTHORIZED,
          detailedMessage: req.t(TErrorKeys.UNAUTHORIZED),
        });
      }

      req.user = user;
      next();
    },
  )(req, res, next);
};
