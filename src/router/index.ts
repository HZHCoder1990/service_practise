import { PROJECT_ENV, PROJECT_NAME } from "@/constant"
import Koa from "koa"
import Router from "koa-router"

import areaRouter from "@/router/area.router"

// 一旦执行文件内的代码，从上到下进行加载执行

const router = new Router()

/**
 * @description 加载所有的路由
 */
export const loadAllRouters = (app: Koa) => {
  // 默认路由
  router.get("/", async (ctx, next) => {
    ctx.body = {
      message: `欢迎访问${PROJECT_NAME}, 当前环境是:${PROJECT_ENV}, 当前时间:${new Date().toLocaleString()}`,
    }
    await next()
  })

  // 每一个router都要配置routes()和allowedMethods()
  app.use(router.routes()).use(router.allowedMethods())

  // area路由
  app.use(areaRouter.routes()).use(areaRouter.allowedMethods())
}
