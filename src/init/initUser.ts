import { DEFAULT_ROLE_INFO } from "@/constant"
import { IInitUser } from "@/types"

// 默认数据
export const initUserData: Record<string, IInitUser> = {
  admin: {
    id: 1,
    username: "admin",
    avatar: "http://hg.dev.zhelilian.cn/coderhub/a.jpg",
    user_roles: [DEFAULT_ROLE_INFO.SUPER_ADMIN.id],
    live_room: {
      id: 1,
      name: "房东的猫-美好事物",
      desc: "房东的猫livehouse合集",
      area: [1], // 分区id
    },
  },
  systemUser1: {
    id: 2,
    username: "胖虎",
    avatar: "http://hg.dev.zhelilian.cn/coderhub/avatar.jpeg",
    live_room: {
      id: 2,
      name: "房东的猫-云烟成雨",
      desc: "房东的猫livehouse合集",
      area: [1],
    },
  },
}
