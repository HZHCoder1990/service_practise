import { PROJECT_ENV, PROJECT_ENV_ENUM } from "@/constant"
import fs from 'fs'
import path from 'path'

export interface DockerConfig {
  // todo
}

export interface MySQLConfig {
  docker?: DockerConfig
  database: string
  host: string
  port: number
  username: string
  password: string
}

export const MYSQL_CONFIG: MySQLConfig = {
  database:
    PROJECT_ENV === PROJECT_ENV_ENUM.development ? "coderhub_db" : "****",
  host: PROJECT_ENV === PROJECT_ENV_ENUM.development ? "127.0.0.1" : "****",
  port: 3306,
  username: "root",
  password: PROJECT_ENV === PROJECT_ENV_ENUM.development ? "1234" : "****",
}

export const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "../config/keys/private.key"))
export const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "../config/keys/public.key"))
