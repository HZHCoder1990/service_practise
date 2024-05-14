// 环境
export enum PROJECT_ENV_ENUM {
  development = "development",
  prod = "prod",
  beta = "beta",
}

export const PROJECT_ENV = process.env
  .NODE_APP_RELEASE_PROJECT_ENV as PROJECT_ENV_ENUM
export const PROJECT_NAME = process.env.NODE_APP_RELEASE_PROJECT_NAME as string
export const PROJECT_PORT = process.env.NODE_APP_RELEASE_PROJECT_PORT as string
export const PROJECT_NODE_ENV = process.env.NODE_ENV as string

export const COMMON_HTTP_CODE = {
  success: 200, // 成功
  apiCache: 304, // 接口缓存
  paramsError: 400, // 参数错误
  unauthorized: 401, // 未授权
  forbidden: 403, // 权限不足
  notFound: 404, // 未找到
  methodNotAllowed: 405, // 方法不允许，如：服务端提供了一个get的/api/list接口，但客户端却post了/api/list接口
  serverError: 500, // 服务器错误
}

export const COMMON_SUCCESS_MSG = {
  GET: "获取成功！",
  POST: "新增成功！",
  PUT: "修改成功！",
  DELETE: "删除成功！",
}
