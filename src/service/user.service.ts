import userModel from "@/model/user.model"
import { IUser } from "@/types"
import { Op } from "sequelize"

class UserService {
  // 查询用户是否存在
  async isExist(ids: number[]): Promise<boolean> {
    // 不加 `await`，返回 Promise<number>
    // 加了 `await`，卡住的同时，返回 number
    const amount = await userModel.count({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    })
    return amount === ids.length
  }


  // 创建用户

  async create(data: IUser) {
    const result = await userModel.create(data)
    // 返回 Promise<UserModel>
    return result
  }

}

export default new UserService()
