# 快速开始指南

## 第一步：安装依赖

从项目根目录运行：

```bash
npm run install-all
```

这会同时安装根目录、客户端和服务器的依赖。

## 第二步：配置数据库

1. 确保 MongoDB 已安装并运行
2. 在 `server/.env` 中配置 MongoDB 连接字符串

## 第三步：初始化数据

进入 server 目录并运行 seed 脚本：

```bash
cd server
node seed.js
cd ..
```

这会添加示例医生和商品数据。

## 第四步：启动应用

从根目录运行：

```bash
npm start
```

这会同时启动前端（http://localhost:3000）和后端（http://localhost:5000）。

## 测试应用

1. 打开 http://localhost:3000
2. 点击"注册"创建新账户
3. 登录后，尝试以下功能：
   - 查看医生团队
   - 创建新宠物档案
   - 预约挂号
   - 提交在线咨询
   - 浏览药品商城

## 问题排查

### MongoDB 连接失败
- 确保 MongoDB 服务正在运行
- 检查 `.env` 中的连接字符串
- 如果使用云数据库，检查网络连接

### 前端无法连接后端
- 确保后端服务器正在运行（端口 5000）
- 检查浏览器控制台的错误信息
- 确保 CORS 已启用

### 依赖安装失败
- 清除 npm 缓存：`npm cache clean --force`
- 删除 node_modules 和 package-lock.json
- 重新运行 `npm install`

## 下一步

- [ ] 配置支付功能（支付宝/微信）
- [ ] 添加管理后台
- [ ] 部署到生产环境
- [ ] 添加更多功能和优化
