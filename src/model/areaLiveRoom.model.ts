import { sequelize } from "@/config/mysql"
import { IAreaLiveRoom } from "@/types"
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize"

interface AreaLiveRoomModel
  extends Model<
      InferAttributes<AreaLiveRoomModel>,
      InferCreationAttributes<AreaLiveRoomModel>
    >,
    IAreaLiveRoom {}

    // 联结表
const model = sequelize.define<AreaLiveRoomModel>(
  "area_live_room",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    area_id: {
      type: DataTypes.INTEGER,
    },
    live_room_id: {
      type: DataTypes.INTEGER,
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
