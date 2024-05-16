import goodsController from "@/controller/goods.controller"
import Router from "koa-router"

// 路由只负责调度路由，具体的数据传递交给对应的 controller 来实现
const goodsRouter = new Router({
  prefix: "/goods",
})

// 商品列表
goodsRouter.get("/list", goodsController.getList)

export default goodsRouter
