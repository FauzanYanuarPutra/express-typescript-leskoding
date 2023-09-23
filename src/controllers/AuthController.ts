import { Request, Response } from "express";

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    return res.status(200).send({data: "dataUser"})
  }
  public async create(req: Request, res: Response): Promise<Response> {
    return res.status(200).send({data: "dataUser"})
  }
}

export default new UserController()
