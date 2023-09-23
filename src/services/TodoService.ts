import { Request } from "express"
const db = require("../db/models");

class TodoService {
  credentials: {
    id: number
  }
  body: Request['body']
  params: Request['params']

  constructor(req: Request) {
    this.credentials = req.app.locals.credentials,
    this.body = req.body,
    this.params = req.params
  }

  find = async () => {
    const todos = await db.todo.findAll({
      where: {
        user_id: this.credentials.id
      },
      include: {
        model: db.user,
        attributes: ['id', 'username']
      }
    })
    return todos
  }

  findOne = async () => {
    const todos = await db.todo.findOne({
      where: {
        id: this.params.id,
        user_id: this.credentials.id
      },
      include: {
        model: db.user,
        attributes: ['id', 'username']
      }
    })

    return todos
  }

  create = async () => {
    const todos = await db.todo.create({
      user_id: this.credentials.id,
      description: this.body.description
    })
    return todos
  }

  findByIdAndUpdate = async () => {
    const todos = await db.todo.update(
      {
        description: this.body.description
      },
      {
        where: {
          id: this.params.id,
          user_id: this.credentials.id
        }
      }
    )
    return todos
  }

  findByIdAndDelete = async () => {
    const todos = await db.todo.destroy({
      where: {
        id: this.params.id,
        user_id: this.credentials.id
      }
    })
    return todos
  }

}



export default TodoService