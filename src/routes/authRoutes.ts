import express from 'express';
import AuthController from '../controllers/AuthController';
import { authenticateToken } from '../middleware';

const authRouter = express.Router();
authRouter.post('/login', AuthController.login);
authRouter.post('/request-access', AuthController.requestAccess);
authRouter.get(
  '/is-authenticated',
  authenticateToken,
  AuthController.getIsAuthenticated,
);
export { authRouter };
