import { PRIVATE_KEY } from "@/secret"
import jwt from "jsonwebtoken"

/**
 * 生成jwt
 */
export const signJwt = ( userInfo: any, exp: number): string => {
  return jwt.sign(userInfo, PRIVATE_KEY, {
    expiresIn: 60 * 60 * exp, // 过期时间
    algorithm: "RS256",
  })
} 
