import UserController from "../controllers/UserController";
import { auth } from "../middlewares/AuthMiddleware";
import BaseRoutes from "./BaseRoutes";


class UserRouter extends BaseRoutes {
  public routes(): void {
    this.router.get('/', auth, UserController.index);
    this.router.get('/:id', UserController.show);
    this.router.post('/', UserController.create);
    this.router.patch('/:id', UserController.update);
    this.router.delete('/:id', UserController.delete);

  }
}

export default new UserRouter().router;