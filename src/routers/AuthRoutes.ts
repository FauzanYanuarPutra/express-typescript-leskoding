import AuthController from "../controllers/AuthController";
import { auth } from "../middlewares/AuthMiddleware";
import validateAuth from "../middlewares/AuthValidator";
import BaseRoutes from "./BaseRoutes";


class AuthRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/register', validateAuth, AuthController.register);
    this.router.post('/login', validateAuth, AuthController.login);
    this.router.get('/profile', auth, AuthController.profile);
  }
}

export default new AuthRoutes().router;