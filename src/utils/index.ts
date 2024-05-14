import { IResponseType } from "@/types"
import os from "os"

/**
 * 获取当前机器的IP地址
 */

export const getIPAddress = () => {
  const interfaces = os.networkInterfaces()
  const res: string[] = []
  Object.keys(interfaces).forEach((dev) => {
    const iface = interfaces[dev]
    if (iface) {
      for (let i = 0; i < iface.length; i++) {
        const { family, address } = iface[i]
        if (family === "IPv4") {
          res.push(address)
        }
      }
    }
  })
  return res
}

/**
 * 处理返回的分页数据
 */
export const handlePaging = <T>(
  result: any,
  nowPage?: string,
  pageSize?: string
) => {
  const resNowPage = nowPage ? +nowPage : 1
  const resPageSize = pageSize ? +pageSize : 1
  const resHasMore = resNowPage * resPageSize - result.count < 0
  const resTotal = result.count
  const resRows = result.rows

  const obj: IResponseType<T> = {
    nowPage: resNowPage,
    pageSize: resPageSize,
    hasMore: resHasMore,
    total: resTotal,
    rows: resRows,
  }
  return obj
}
