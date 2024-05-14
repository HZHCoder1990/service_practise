import { signJwt } from "@/app/auth/authJwt"
import { initUserData } from "@/init/initUser"
import userService from "@/service/user.service"
import { IInitUser } from "@/types"
import areaModel from "@/model/area.model"
import liveRoomModel from "@/model/liveRoom.model"
import { bulkCreateArea } from "@/init/initData"
import liveRoomService from "@/service/liveRoom.service"

interface ICommon {
  initDefault: () => void
}

/**
 * 初始化一些默认用户数据
 */
const initUser = () => {
  const initOneUser = async (user: IInitUser) => {
    // 用户没有标识id
    if (!user.id) return
    // 查询数据库中是否已经存在相同id的用户
    const userIsExist = await userService.isExist([user.id])
    if (!userIsExist) {
      const userInfo = {
        id: user.id,
        username: user.username,
        avatar: user.avatar,
      }
      const exp = 24 // token过期时间为24小时
      const token = signJwt(userInfo, exp)
      // 创建用户
      await userService.create({
        ...userInfo,
        password: "12345678", // 先写死
        token,
      })
    } else {
      console.log("用户已经存在")

    }

    // 用户关联的直播间是否存在
    if (!user.live_room?.id) return
    const liveRoomIsExist = await liveRoomService.isExist([user.live_room.id])
    if (!liveRoomIsExist) {
      // 写入数据库
      const liveRoom = await liveRoomModel.create({
        id: user.live_room?.id,
        name: user.live_room?.name,
        desc: user.live_room?.desc,
      })
    } else {
      console.log("用户的直播间已经存在")
    }
  }

  // Object.keys => 获取一个对象的keys
  Object.keys(initUserData).forEach((item) => {
    initOneUser(initUserData[item])
  })

  // 随便写的
  return new Promise<string>((resolver) => {
    resolver("ok")
  })
}

/**
 * 初始化分区数据
 */
const initArea = async () => {
  const count = await areaModel.count()
  if (count === 0) {
    // 初始化分区 => 将默认分区数据写入数据库
    await areaModel.bulkCreate(bulkCreateArea)
  } else {
    // 抛出异常
    console.log("已经初始化过分区，不能再初始化了")
  }
}

class InitController {
  // 属性
  common: ICommon = {
    initDefault: async () => {
      try {
        await initUser()
        await initArea()
      } catch (error) {
        console.log(error)
      }
    },
  }
}

export default new InitController()
