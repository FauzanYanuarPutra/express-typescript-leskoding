import AuthController from "../controllers/AuthController";
import { auth } from "../middlewares/AuthMiddleware";
import validate from "../middlewares/AuthValidator";
import BaseRoutes from "./BaseRoutes";


class AuthRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/register', validate, AuthController.register);
    this.router.post('/login', validate, AuthController.login);
    this.router.get('/profile', auth, AuthController.profile);

  }
}

export default new AuthRoutes().router;