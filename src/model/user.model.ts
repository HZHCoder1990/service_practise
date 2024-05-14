import { sequelize } from "@/config/mysql"
import { IUser, UserStatusEnum } from "@/types"
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize"

// 定义类型
interface UserModel
  extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>>,
    IUser {}

const model = sequelize.define<UserModel>(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: UserStatusEnum.normal,
    },
    avatar: {
      type: DataTypes.STRING(150),
    },
    desc: {
      type: DataTypes.STRING(50),
      defaultValue: "这个人很懒，什么也没有留下~",
    },
    token: {
      type: DataTypes.TEXT,
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    // 重新命名在数据库中
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
)

export default model
