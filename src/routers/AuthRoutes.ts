import AuthController from "../controllers/AuthController";
import BaseRoutes from "./BaseRoutes";


class AuthRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/', AuthController.index);
    this.router.post('/', AuthController.create);
  }
}

export default new AuthRoutes().router;