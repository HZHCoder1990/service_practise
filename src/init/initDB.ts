import { PROJECT_ENV, PROJECT_ENV_ENUM } from "@/constant"
import { chalkINFO, chalkSUCCESS } from "@/utils/chalkTip"
import { Sequelize } from "sequelize"
import fs from "fs"

/**
 * @description 加载所有的model
 */
export const loadAllModel = () => {
  // 获取 model文件夹所在的路径
  const modelDir = `${process.cwd()}/${
    PROJECT_ENV === PROJECT_ENV_ENUM.prod ? "dist" : "src"
  }/model`
  // 同步读取model文件夹下的文件
  fs.readdirSync(modelDir).forEach((file: string) => {
    if (PROJECT_ENV === PROJECT_ENV_ENUM.development) {
      // 开发环境读取的是 .ts 后缀
      if (file.indexOf(".model.ts") === -1) return
    } else if (file.indexOf(".model.js") === -1) return
    require(`${modelDir}/${file}`).default
  })

  console.log(chalkSUCCESS("加载数据库表成功"))
}

export type InitDBType = "force" | "alert" | "load"

/**
 * 操作数据库中的表
 * @param type force: 重置所有的表(相当于新建) alert: 更新所有的表  load: 加载数据库所有的表
 */
export const initDb = async (type: InitDBType, sequelizeInst: Sequelize) => {
  switch (type) {
    case "force":
      // 数据 model 加载进内存
      loadAllModel()
      console.log(chalkINFO("初始化数据库所有表"))
      // 创建表,如果表已经存在,则将其首先删除
      await sequelizeInst.sync({ force: true })
      break
    case "load":
      require("../model/relation")
      break

    default:
      break
  }
}
