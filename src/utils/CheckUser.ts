const db = require("../db/models");

class CheckUser {
  public static checkUser = async (username: string): Promise<any> => {
    const user = await db.user.findOne({
      where: {
        username
      }
    })
    return user
  }
}

export default CheckUser

