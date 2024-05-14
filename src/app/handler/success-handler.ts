import { COMMON_HTTP_CODE, COMMON_SUCCESS_MSG } from "@/constant"
import { ParameterizedContext } from "koa"

const successHandler = ({
  httpStatusCode = COMMON_HTTP_CODE.success,
  code = COMMON_HTTP_CODE.success,
  ctx,
  data,
  message,
}: {
  httpStatusCode?: number
  code?: number
  ctx: ParameterizedContext
  data?: any
  message?: string
}) => {
  const method = ctx.request.method
  // 不手动设置状态的话，koa默认方法返回404，delete方法返回400
  ctx.status = httpStatusCode
  // ?? 和 || 操作符的主要区别在于它们对左侧操作数的假值的处理。
  // ?? 仅在左侧操作数为 null 或 undefined 时才考虑右侧操作数，而 || 对所有假值（如 0、''（空字符串）、NaN、false）都会返回右侧操作数。
  ctx.body = {
    code,
    data,
    message: message || COMMON_SUCCESS_MSG[method],
  }
}

export default successHandler
