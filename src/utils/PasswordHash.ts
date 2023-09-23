import bcrypt from 'bcrypt'

class PasswordHash {
  public static hashPassword = (password: string): Promise<string> => {
    return bcrypt.hash(password, 10)
  }
  public static comparePassword = (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash)
  }
}

export default PasswordHash