import { KoaNextType } from "@/types"
import { ParameterizedContext } from "koa"

// 全局错误处理中间件
export const catchErrorMiddleware = async (
  ctx: ParameterizedContext,
  next: KoaNextType
) => {

  await next()
}
