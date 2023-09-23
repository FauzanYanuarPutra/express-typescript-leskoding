import TodoController from "../controllers/TodoController";
import { auth } from "../middlewares/AuthMiddleware";
import validateTodo from "../middlewares/TodoValidator";
import BaseRoutes from "./BaseRoutes";


class UserRouter extends BaseRoutes {
  public routes(): void {
    this.router.get('/', auth, TodoController.index);
    this.router.get('/:id', auth, TodoController.show);
    this.router.post('/', auth, validateTodo , TodoController.create);
    this.router.patch('/:id', auth, TodoController.update);
    this.router.delete('/:id', auth, TodoController.delete);
  }
}

export default new UserRouter().router;