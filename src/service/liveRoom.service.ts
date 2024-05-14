import liveRoomModel from "@/model/liveRoom.model"
import { Op } from "sequelize"

class LiveRoomService {
  // 直播间是否存在
  async isExist(ids: number[]): Promise<boolean> {
    const res = await liveRoomModel.count({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    })
    return res === ids.length
  }
}

export default new LiveRoomService()
