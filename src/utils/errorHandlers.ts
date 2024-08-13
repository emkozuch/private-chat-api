import { Request, Response } from 'express';
import { HttpStatusCode, TErrorKeys } from '../types';

export const sendInternalServerError = (res: Response, req: Request) => {
  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    errorKey: TErrorKeys.INTERNAL_SERVER_ERROR,
    detailedMessage: req.t(TErrorKeys.INTERNAL_SERVER_ERROR),
  });
};

export const handleLoginError = (
  error: unknown,
  res: Response,
  req: Request,
) => {
  if (error instanceof Error) {
    switch (error.message) {
      case TErrorKeys.MISSING_DATA:
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          errorKey: TErrorKeys.MISSING_DATA,
          detailedMessage: req.t(TErrorKeys.MISSING_DATA),
        });
      case TErrorKeys.WRONG_EMAIL_OR_PWD:
        return res.status(HttpStatusCode.UNAUTHORIZED).json({
          errorKey: TErrorKeys.WRONG_EMAIL_OR_PWD,
          detailedMessage: req.t(TErrorKeys.WRONG_EMAIL_OR_PWD),
        });
      default:
        return sendInternalServerError(res, req);
    }
  } else {
    return sendInternalServerError(res, req);
  }
};
