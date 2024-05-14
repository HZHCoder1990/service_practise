import { IArea, IList } from "@/types"

import areaModel from "@/model/area.model"

import { deleteUseLessObjectKey } from "billd-utils"
import { Op } from "sequelize"
import { handlePaging } from "@/utils"
import LiveRoom from "@/model/liveRoom.model"

class AreaService {
  // 获取分区列表
  getList = async (data: IList<IArea>) => {
    const {
      id,
      name,
      remark,
      weight,
      orderBy,
      orderName,
      nowPage,
      pageSize,
      keyword,
      rangTimeType,
      rangTimeStart,
      rangTimeEnd,
    } = data

    // 分页计算
    let offset
    let limit
    if (nowPage && pageSize) {
      offset = (+nowPage - 1) * +pageSize
      limit = +pageSize
    }
    // 剔除掉 等于 undefined、NULL、''的字段名称
    const allWhere = deleteUseLessObjectKey({
      id,
      name,
      remark,
      weight,
    })

    if (keyword) {
      const keyWordWhere = [
        {
          name: {
            [Op.like]: `%${keyword}$`,
          },
        },
        {
          remark: {
            [Op.like]: `%${keyword}%`,
          },
        },
      ]
      allWhere[Op.or] = keyWordWhere
    }
    // 时间范围
    if (rangTimeType) {
      allWhere[rangTimeType] = {
        [Op.gt]: new Date(+rangTimeStart!),
        [Op.lt]: new Date(+rangTimeEnd!),
      }
    }

    const orderRes: any[] = []
    if (orderName && orderBy) {
      // id asc
      orderRes.push([orderName, orderBy])
    }

    // !不一定所有的数据都要存放在数据库中!!!!
    const result = await areaModel.findAndCountAll({
      // 去重
      distinct: true,
      order: [...orderRes],
      limit,
      offset,
      where: {
        ...allWhere,
      },
    })
    return handlePaging(result, nowPage, pageSize)
  }

  // 获取分区直播间列表
  getLiveRoomList = async ({
    area_id,
    live_room_is_show,
    live_room_status,
    nowPage,
    pageSize,
  }) => {
    let offset
    let limit
    if (nowPage && pageSize) {
      offset = (+nowPage - 1) * +pageSize
      limit = +pageSize
    }

    const subWhere = deleteUseLessObjectKey({
      is_show: live_room_is_show,
      status: live_room_status,
    })

    const result = await LiveRoom.findAndCountAll({
      limit,
      offset,
      // 通过什么来操作
      include: [
        {
          model: areaModel,
          through: {
            attributes: [],
          },
          where: { id: area_id },
        },
      ],
    })

    console.log(result)
  }
}

export default new AreaService()
