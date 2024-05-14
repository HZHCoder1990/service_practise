import { initDb } from "@/init/initDB"
import { MYSQL_CONFIG } from "@/secret"
import { chalkERROR, chalkSUCCESS, chalkWARN } from "@/utils/chalkTip"
import { Sequelize } from "sequelize"

// 数据库名称
export const dbName = MYSQL_CONFIG.database

/**
 * @description 配置 sequelize
 * @param dbName 数据库名称
 */
export const newSequelize = (dbName?: string) => {
  return new Sequelize({
    // 数据库名称
    database: dbName,
    // 数据库用户名
    username: MYSQL_CONFIG.username,
    // 数据库密码
    password: MYSQL_CONFIG.password,
    // 连接数据库的端口号
    port: MYSQL_CONFIG.port,
    // 支持的数据库类型
    dialect: "mysql",
    // 配置
    dialectOptions: {
      // 返回正确的时间戳字符串
      dateStrings: true,
      typeCast: true,
    },
    // 设置连接池
    pool: {
      // 最大连接对象的个数
      max: 5,
      min: 0,
      // 最大连接超时时间，单位为毫秒
      acquire: 30000,
      // 最长等待时间，单位为毫秒 (在连接空闲(未使用)10秒后从池中删除连接(idle: 10000)) [一个连接在释放前可空闲的时间]
      idle: 10000,
    },
    // 设置时区
    timezone: "+08:00",
    // 禁用日志记录(不输出到控制台)
    logging: false,
  })
}

const toMessage = (flag: boolean) =>
  `连接${MYSQL_CONFIG.host}:${MYSQL_CONFIG.port}服务器的${dbName}数据库${
    flag ? "成功" : "失败"
  }!`


// 获取 sequelize 实例对象
export const sequelize = newSequelize(dbName)

/**
 * @description 初始化 Mysql 数据库
 */
const initMySql = async () => {
  // 这里为什么要这样操作呢？ 如果直接使用  `sequelize = newSequelize(dbName)` 则代表对应 dbName 的数据库对象已经存在了，
  // 但是其实并没有真正执行过SQL的创建数据库语句来执行创建数据库的操作。

  const initSequelize = newSequelize()
  // 数据库可能不存在，可能发生异常
  try {
    // 使用数据库
    await initSequelize.query(`USE ${dbName}`, { logging: false })
  } catch (error: any) {
    console.log(chalkERROR(error.message))
    // 访问失败
    if (error.message.indexOf("Access") !== -1) {
      console.log(chalkERROR(toMessage(false)))
      await initSequelize.close()
      return
    }

    // 拒绝错误连接
    if (error.message.indexOf("ECONNREFUSED") !== -1) {
      console.log(chalkERROR(toMessage(false)))
      await initSequelize.close()
      return
    }
    // 如果数据库不存在，则需要新建
    console.log(chalkWARN(`${dbName}数据库不存在，开始新建${dbName}数据库!`))
    await initSequelize.query(
      `CREATE DATABASE ${dbName} CHARACTER SET = 'utf8mb4';`,
      { logging: false }
    )
    console.log(chalkSUCCESS(`新建${dbName}数据库成功!`))
    // 接下来创建数据库中的所有表，此时 sequelize 对应已经和 对应名称的数据库关联了
    await initDb("force", sequelize)
  }
  // 关闭
  await initSequelize.close()
}

/**
 * @description 连接 mysql 数据库
 */
export const connectMysql = async () => {
  // 初始化数据库
  await initMySql()
  console.log(
    chalkSUCCESS(
      `开始连接${MYSQL_CONFIG.host}:${MYSQL_CONFIG.port}服务器的${dbName}数据库`
    )
  )
  // 测试链接
  sequelize
    .authenticate()
    .then(async (res) => {
      console.log("连接数据库成功")
      
      // 加载关系表
      initDb('load', sequelize)
    })
    .catch((err) => {
      console.log("连接数据库失败:", err)
    })
}
