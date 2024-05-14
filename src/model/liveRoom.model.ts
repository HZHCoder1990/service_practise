import { sequelize } from "@/config/mysql"
import { ILiveRoom } from "@/types"
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize"

interface LiveRoomModel
  extends Model<
      InferAttributes<LiveRoomModel>,
      InferCreationAttributes<LiveRoomModel>
    >,
    ILiveRoom {}
    
const model = sequelize.define<LiveRoomModel>(
  "live_room",
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
    desc: {
      type: DataTypes.STRING(300),
    },
  },
  {
    paranoid: true,
    freezeTableName: true,
    // 重新命名在数据库中的字段
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
)

export default model
