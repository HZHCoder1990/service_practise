import Koa from "koa"

import { catchErrorMiddleware } from "@/app/app.middleware"
import { loadAllRouters } from "./router"

export const setupKoa = async (port: number) => {
  // 初始化 Koa
  const app = new Koa()

  //   app.proxy = true todo

  // 全局错误处理
  app.use(catchErrorMiddleware)

  // 加载所有路由
  loadAllRouters(app)

  // 这里为什么要返回一个 Promise对象？ 这样做的目的是
  // 卡住代码的执行，即2s后执行 打印 `22`，再打印 `33`的动作
  await new Promise((resolve) => {
    const httpServer = app.listen(port, () => {
      resolve("ok")
    })
  })
}
