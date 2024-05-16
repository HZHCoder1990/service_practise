import { KoaNextType } from "@/types"
import { ParameterizedContext } from "koa"

class GoodsController {
  getList = async (ctx: ParameterizedContext, next: KoaNextType) => {
    const data = ctx.request.query
    console.log(data)
  }
}

export default new GoodsController()
