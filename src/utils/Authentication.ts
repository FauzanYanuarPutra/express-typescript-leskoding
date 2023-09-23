import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
require("dotenv").config();


class Authentication {
  public static hashPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10)
  }
  public static comparePassword = (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash)
  }

  public static generateToken = (id: number, username: string, password: string): string => {
    const secret = process.env.JWT_SECRET || "secret"
    const token = jwt.sign({ id, username, password }, secret)
    return token
  }
}

export default Authentication