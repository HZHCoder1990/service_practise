// 用户状态
export enum UserStatusEnum {
  // 正常状态
  normal,
  // 禁用状态
  disable,
}

export enum UserIsTouristEnum {
  yes,
  no,
}

export interface IUser {
  id?: number
  username?: string
  password?: string
  status?: UserStatusEnum
  avatar?: string
  desc?: string
  token?: string
  is_tourist?: UserIsTouristEnum
}

export interface IInitUser extends IUser {
  user_roles?: number[]
  live_room?: ILiveRoom & {
    devFFmpeg?: boolean
    prodFFmpeg?: boolean
    area?: number[]
    localFile?: string
  }
}

// 直播间是否展示
export enum LiveRoomIsShowEnum {
  yes,
  no,
}
// 直播间状态
export enum LiveRoomStatusEnum {
  normal,
  disable,
}

// 直播间具体信息
export interface ILiveRoom {
  id?: number
  /** 直播间名称 */
  name?: string
  /** 直播间简介 */
  desc?: string
}

// 分区对应的直播
export interface IAreaLiveRoom {
  id?: number
  // 分区id, 外键
  area_id?: number
  live_room_id?: number
  area?: IUser
  // 直播间信息
  live_room?: ILiveRoom
  // 创建时间
  created_at?: string
  // 更新时间
  updated_at?: string
  // 删除时间
  deleted_at?: string
}

export interface IArea {
  // 分区id
  id?: number
  // 分区名称
  name?: string
  // 备注
  remark?: string
  // 权重
  weight?: number
  // 分区对应下面直播间数据
  area_live_rooms?: IAreaLiveRoom[]
  // 分区下直播间是否可见
  live_room_is_show?: LiveRoomIsShowEnum
  // 分区下直播间状态
  live_room_status?: LiveRoomStatusEnum
  // 创建时间
  created_at?: string
  // 更新时间
  updated_at?: string
  // 删除时间
  deleted_at?: string
}

export type IList<T> = {
  nowPage?: string
  pageSize?: string
  orderBy?: string
  orderName?: string
  keyword?: string
  rangTimeType?: "created_at" | "updated_at" | "deleted_at"
  rangTimeStart?: string
  rangTimeEnd?: string
} & T

export type IResponseType<T> = {
  nowPage: number,
  pageSize: number,
  hasMore: boolean,
  total: number,
  rows: T[]
}

export type KoaNextType = () => Promise<any>
