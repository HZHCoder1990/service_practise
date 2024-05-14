import { connectMysql } from "./config/mysql"
import { PROJECT_ENV, PROJECT_NAME, PROJECT_PORT } from "./constant"
import { MYSQL_CONFIG } from "./secret"
import { getIPAddress } from "@/utils"
import { performance } from "perf_hooks"
import {
  chalkERROR,
  chalkINFO,
  chalkSUCCESS,
  chalkWARN,
} from "./utils/chalkTip"

// import导入不会去加载 setup 中的代码，只有使用了导出的函数时，才会去加载 setup 里面的代码
// import { setupKoa } from "@/setup"
// setupKoa()
//   .then((res) => {
//     console.log(res)
//   })
//   .catch((err) => {
//     console.log(err)
//   })

// performance.now() 比 Date.now() 提供了更高的时间分辨率，并且减少了时间测量的不确定性
// 单位毫秒(ms)
const start = performance.now()

// 整个服务的入口
const mainEntry = async () => {

  // 将可能出现异常的代码包裹起来
  try {
    await Promise.all([
      // 连接数据库
       connectMysql(),
    ])

    // 初始化默认的数据
    await (
      await import("./controller/init.controller")
    ).default.common.initDefault()

    // koa
    // string 转为 number
    const port = +PROJECT_PORT
    await (await import("./setup")).setupKoa(port)

    /* 端口等信息  */

    console.log(chalkWARN(`监听端口: ${port}`))
    console.log(chalkWARN(`项目名称: ${PROJECT_NAME}`))
    console.log(chalkWARN(`项目环境: ${PROJECT_ENV}`))
    console.log(chalkWARN(`Mysql数据库: ${MYSQL_CONFIG.database}`))

    getIPAddress().forEach((ip) => {
      console.log(chalkSUCCESS(`http://${ip}:${port}/`))
    })

    console.log(
      chalkSUCCESS(
        `项目启动成功! 耗时: ${Math.floor(performance.now() - start)}ms`
      )
    )
  } catch (error) {
    console.log(chalkERROR("项目启动失败!"))
  }
}

mainEntry()

