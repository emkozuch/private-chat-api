import express from 'express';
import { authenticateToken } from '../middleware';
import { UserController } from '../controllers';

const userRouter = express.Router();
userRouter.get('/profile', authenticateToken, UserController.getUserProfile);
export { userRouter };
