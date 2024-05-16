import successHandler from "@/app/handler/success-handler"
import areaService from "@/service/area.service"
import { IArea, IList, KoaNextType } from "@/types"
import { ParameterizedContext } from "koa"

class AreaController {
  // 类里面不能使用 const 来定义箭头函数
  getList = async (ctx: ParameterizedContext, next: KoaNextType) => {
    const queryData = ctx.request.query
    // 获取到 GET 请求传递过来的query参数
    // 解构的同时支持赋值
    const {
      id,
      name,
      remark,
      weight,
      orderBy = "asc",
      orderName = "id",
      nowPage,
      pageSize,
      keyword,
      rangTimeType,
      rangTimeStart,
      rangTimeEnd,
    }: IList<IArea> = queryData

    // service 操作数据库
    const result = await areaService.getList({
      id,
      name,
      remark,
      weight,
      nowPage,
      pageSize,
      orderBy,
      orderName,
      keyword,
      rangTimeType,
      rangTimeStart,
      rangTimeEnd,
    })

    // 拿到从数据库中查询到的结果响应给前端
    successHandler({ ctx, data: result })
    await next()
  }

  getLiveRoomList = async (ctx: ParameterizedContext, next: KoaNextType) => {
    const queryData = ctx.request.query
    const {
      id,
      live_room_is_show,
      live_room_status,
      nowPage,
      pageSize,
    }: IList<IArea> = queryData

    const result = await areaService.getLiveRoomList({
      area_id: id,
      live_room_is_show,
      live_room_status,
      nowPage,
      pageSize,
    })
    successHandler({ctx, data: result})
    await next()
  }
}

export default new AreaController()
