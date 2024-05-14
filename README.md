## 前言

用TS来写服务端

## 环境配置

```shell
$ mkdir billd-live-server-ts
$ cd billd-live-server-ts
$ npm init -y

# 添加TS依赖 dev环境
$ npm i --save-dev typescript

# 添加tsconfig.json文件
# ! 找不到命令 把ts安装到全局 npm install typescript -g
$ tsc --init
```

### package.json配置

devDependencies

```shell
$ npm i --save-dev cross-env # 不同操作系统上设置环境变量
$ npm i --save-dev @swc-node/register # @swc-node/register 是一个 SWC 的 Node.js 注册器，它允许你在 Node.js 中直接运行 TypeScript 文件，而无需先将其编译为 JavaScript
$ npm i --save-dev nodemon  # 热更新

# 运行脚本
$ pnpm run dev 

# 如果我们在开发环境需要查看一些包的类型(即.d.ts)，需要安装对应的包，如
$ pnpm i @types/koa --save-dev
```

推荐使用 `pnpm`，速度更快(后续的操作也使用 `pnpm` 命令)

```shell
$ npm install -g pnpm

$ pnpm i  # 安装依赖
```

dependencies

```shell
$ pnpm i chalk # 日志多彩 需要安装 4.x版本。5.x不再支持CommonJS
$ pnpm i node-emoji # emoji
$ pnpm i mysql2@2.3.3 # 数据库
$ pnpm i sequelize@6.32.1 # 操作数据库
$ pnpm i koa 
$ pnpm i koa-body
$ pnpm i koa-bodyparser
$ pnpm i koa-router

$ pnpm i jsonwebtoken
```

### tsconfig.json配置

### eslint(待补充)

### prettierrc(待补充)



## Private.key 和 Public.key获取

> 1. 进入要创建文件夹keys下
> 2. openssl genrsa -out private.key 2048
> 3. openssl rsa -in private.key -pubout -out public.key



## 知识点

###  Promise对象

<img src="http://hg.dev.zhelilian.cn/s3/1.png" style="zoom:50%;" />

### `import`()说明

`import()` 函数是 JavaScript 中的一个动态导入语法，它允许你在运行时按需加载模块。当你使用 `import('./setup')` 时，它会返回一个 Promise 对象，该对象在模块加载并解析完成时被解决（resolve）。

```typescript
// 动态导入 setup 模块
import('./setup').then(module => {
  // module 是一个包含所有导出的模块对象
  // 使用 module.default 来访问默认导出
  // 使用 module.someNamedExport 来访问命名导出
}).catch(error => {
  // 处理加载模块时发生的错误
});
```

eg

```typescript
// test.ts 文件
export const name = "胖虎"

export const sumFun = (a: number, b: number) => a + b

export default "大胖虎"
```

```typescript
import('./test').then(module => {
  console.log(module.name) // 胖虎 
  console.log(module.sumFun(1, 3)) // 4
  console.log(module.default); // 大胖虎
})
```

```typescript
// import导入不会去加载 setup 中的代码，只有使用了导出的函数时，才会去加载 setup 里面的代码
import { setupKoa } from "@/setup"

// require 会去加载 test 中的代码
require('./test')
```

