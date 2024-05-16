import LiveRoom from "@/model/liveRoom.model"
import Area from "@/model/area.model"
import AreaLiveRoom from "@/model/areaLiveRoom.model"

// 建立表关系

// 一个直播间可能属于A分区，同时也属于B分区
// 一个分区可能包含多个不同的直播间
LiveRoom.belongsToMany(Area, {
  foreignKey: "live_room_id", // 在 AreaLiveRoom 中表示 LiveRoom 的外键
  otherKey: "area_id", // 在 AreaLiveRoom 中表示 Area 的外键
  constraints: false, // 不创建外键约束
  through: {
    model: AreaLiveRoom, // 指定中间模型
    unique: false, // 指定不为这个关系创建唯一索引
  },
})
Area.belongsToMany(LiveRoom, {
  foreignKey: "area_id",
  otherKey: "live_room_id",
  constraints: false,
  through: {
    model: AreaLiveRoom,
    unique: false,
  },
})