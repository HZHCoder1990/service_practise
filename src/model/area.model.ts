import { sequelize } from "@/config/mysql"
import { IArea } from "@/types"
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize"

interface AreaModel
  extends Model<InferAttributes<AreaModel>, InferCreationAttributes<AreaModel>>,
    IArea {}

const model = sequelize.define<AreaModel>(
  "area",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
    },
    weight: {
      type: DataTypes.INTEGER,
    },
    remark: {
      type: DataTypes.STRING(100),
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
