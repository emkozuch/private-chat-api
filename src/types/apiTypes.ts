import { TErrorKeys } from './errorKeys';

export type LoginRequestDto = {
  email: string;
  password: string;
};

export type BaseError = {
  errorKey: TErrorKeys;
  detailedMessage: TErrorKeys;
};

export type AccessRequestDto = {
  email: string;
};
