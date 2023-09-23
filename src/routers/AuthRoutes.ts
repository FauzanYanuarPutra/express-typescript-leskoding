import AuthController from "../controllers/AuthController";
import validate from "../middlewares/AuthValidator";
import BaseRoutes from "./BaseRoutes";


class AuthRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/register', validate, AuthController.register);
    this.router.post('/login', validate, AuthController.login);
  }
}

export default new AuthRoutes().router;