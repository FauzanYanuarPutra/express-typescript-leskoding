import { Request, Response } from "express";
import IController from "./ControllerInterface";

interface User {
  id: number,
  name: string
  age: number
}

let dataUser: User[] = [
  { id: 1, name: 'John', age: 20 },
  { id: 2, name: 'Jane', age: 30 },
  { id: 3, name: 'Bob', age: 40 },
  { id: 4, name: 'Alice', age: 50 }
]

class UserController implements IController {
  public async index(req: Request, res: Response): Promise<Response> {
    return res.status(200).json({ data : dataUser })
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id)
    if(isNaN(id)) {
      return res.status(400).send({ message: 'Id must be a number' })
    }
    
    const showData = dataUser.find((item) => item.id === id)
    if (!showData) {
      return res.status(404).send({ message: 'User not found' })
    }


    return res.status(200).send({ data: showData})
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { id, name, age }: User = req.body
    
    const data: User = {
      id,
      name,
      age
    }

    dataUser.push(data)

    return res.status(200).send({data: dataUser})
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id)
    const {name, age} = req.body

    if(isNaN(id)) {
      return res.status(400).send({ message: 'Id must be a number' })
    }

    const dataBaru: User = {
      id,
      name,
      age
    }

    const data = dataUser.map((item) => {
      if (item.id === id) {
        return {...dataBaru} 
      } else {
        return item; 
      }
    });
    

    return res.status(200).send({data})
  }

  public async delete(req: Request, res: Response): Promise<Response> {

    const data = dataUser.filter((item) => item.id !== Number(req.params.id))
    return res.status(200).send({ data })
  }

}

export default new UserController()
