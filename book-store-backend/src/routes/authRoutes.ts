import { Router } from 'express';
import { AuthController } from '../controllers/authController';

export default function authRoutes() {
  const router = Router();
  const authController = new AuthController();

  router.post('/login', authController.login.bind(authController));
  router.post('/register', authController.register.bind(authController));
  router.post('/logout', authController.logout.bind(authController));

  return router;
}