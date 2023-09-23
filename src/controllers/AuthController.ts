import { Request, Response } from "express";
const db = require("../db/models");

import PasswordHash from "../utils/PasswordHash";
import CheckUser from "../utils/CheckUser";

class UserController {
  async register(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).send({ message: "Username and password are required" })
    }

    const check = await CheckUser.checkUser(username)

    if(check) {
      return res.status(400).send({ message: "User already exists" })
    }

    const hashPassword = await PasswordHash.hashPassword(password)
    
    await db.user.create({
      username,
      password: hashPassword
    })

    return res.status(200).send({message: "Register Success"})
  }
  async login(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body
    if (!username || !password) {
      return res.status(400).send({ message: "Username and password are required" })
    }

    const check = await CheckUser.checkUser(username)

    if(!check) {
      return res.status(400).send({ message: "Invalid username or password" })
    }

    const isMatch = await PasswordHash.comparePassword(password, check.password)

    if (!isMatch) {
      return res.status(400).send({ message: "Invalid username or password" })
    }

    return res.status(200).send({message: "Login Success"})
  }
}

export default new UserController()
