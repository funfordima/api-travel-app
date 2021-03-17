import { Router } from 'express';
import authController from '../mongoStore/authController';
import { check } from 'express-validator';

const authRouter = Router();

authRouter.get('/users', authController.getUsers);

authRouter.post('/registration', [
  check('username', 'Username cannot be empty').notEmpty(),
  check('password', 'Password must be at least 4 characters up to 10').isLength({ min: 4, max: 10 }),
  check('email', 'Email cannot be empty').notEmpty(),
], authController.registration);

authRouter.post('/login', authController.login);

export default authRouter;
