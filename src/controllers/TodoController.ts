import { Request, Response } from "express";
import IController from "./ControllerInterface";
import TodoService from "../services/TodoService";

class TodoController implements IController {
  async index(req: Request, res: Response): Promise<Response> {
    const service: TodoService = new TodoService(req)
    const todos = await service.find()    
    
    return res.status(200).json({message: "Menampilkan Data Todo", data: todos})
  }

  async show(req: Request, res: Response): Promise<Response> {
    const service: TodoService = new TodoService(req)
    const todo = await service.findOne()    

    if (!todo) {
      return res.status(404).send({ message: "Todo not found" })
    }

    return res.status(200).json({message: "Menampilkan Detail Data Todo", data: todo })

  }

  async create(req: Request, res: Response): Promise<Response> {
    const service: TodoService = new TodoService(req)
    const todo = await service.create()   

    return res.status(200).send({ message: "Menambahkan Data Todo", data: todo })
    
  }

  async update(req: Request, res: Response): Promise<Response> {
    const service: TodoService = new TodoService(req)
    const todo = await service.findByIdAndUpdate() 
    
    if(todo[0] === 0) {
      return res.status(404).send({ message: "Todo not found" })
    }

    return res.status(200).json({message: "Mengubah Detail Data Todo", data: todo })

  }

  async delete(req: Request, res: Response): Promise<Response> {
    const service: TodoService = new TodoService(req)
    const todo = await service.findByIdAndDelete() 

    if(!todo) {
      return res.status(404).send({ message: "Todo not found" })
    }

    return res.status(200).json({message: "Menghapus Detail Data Todo", data: todo })
  }

}

export default new TodoController()
