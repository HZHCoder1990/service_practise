import Router from "koa-router"
import areaController from "@/controller/area.controller"

// 路由只负责调度路由，具体的数据传递交给对应的 controller 来实现
const areaRouter = new Router({
  prefix: "/area",
})

// 分区列表
areaRouter.get('/list', areaController.getList)

// 分区下对应的直播间
areaRouter.get('/area_live_room_list', areaController.getLiveRoomList)

export default areaRouter