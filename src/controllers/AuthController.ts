import { Request, Response } from "express";
const db = require("../db/models");

import Authentication from "../utils/Authentication";
import CheckUser from "../utils/CheckUser";

class UserController {
  async register(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body

    const check = await CheckUser.checkUser(username)

    if(check) {
      return res.status(400).send({ message: "User already exists" })
    }

    const hashPassword = await Authentication.hashPassword(password)
    
    await db.user.create({
      username,
      password: hashPassword
    })

    return res.status(200).send({message: "Register Success"})
  }
  async login(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body

    const user = await CheckUser.checkUser(username)

    if(!user) {
      return res.status(400).send({ message: "Invalid username or password" })
    }

    const isMatch = await Authentication.comparePassword(password, user.password)

    if (!isMatch) {
      return res.status(400).send({ message: "Invalid username or password" })
    }

    const token = Authentication.generateToken(user.id, user.username, user.password)

    return res.status(200).send({message: "Login Success", token})
  }

  async profile(req: Request, res: Response): Promise<Response> {
    return res.status(200).send({data: req.app.locals.credentials})
  }
}

export default new UserController()
