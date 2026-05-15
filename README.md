# 宠物医院网站

一个功能完整的宠物医院在线预约和管理系统，使用 React + Node.js + MongoDB 技术栈构建。

## 功能特性

- ✅ **用户管理** - 用户注册、登录、档案管理
- ✅ **医生团队展示** - 展示医生信息和专长
- ✅ **在线挂号预约** - 选择医生和宠物进行预约
- ✅ **宠物病历管理** - 管理宠物信息和就诊记录
- ✅ **在线咨询** - 与医生进行在线咨询
- ✅ **药品商城** - 浏览和购买宠物用品和药品
- ✅ **支付功能** - 订单支付管理

## 项目结构

```
pet-hospital-website/
├── client/                 # React 前端应用
│   ├── public/            # 静态文件
│   ├── src/
│   │   ├── components/    # React 组件
│   │   ├── pages/         # 页面组件
│   │   ├── services/      # API 服务
│   │   ├── styles/        # 样式文件
│   │   ├── App.js         # 主应用
│   │   └── index.js       # 入口文件
│   └── package.json
├── server/                # Node.js 后端服务
│   ├── models/            # 数据库模型
│   ├── routes/            # API 路由
│   ├── middleware/        # 中间件
│   ├── server.js          # 服务器入口
│   ├── package.json
│   └── .env               # 环境变量
└── README.md
```

## 前置要求

- Node.js (v14.0.0 或更高)
- npm 或 yarn
- MongoDB (本地或云端)

## 安装和运行

### 1. 后端设置

```bash
cd server
npm install
```

配置 `.env` 文件：
```
MONGODB_URI=mongodb://localhost:27017/pet-hospital
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

启动后端服务器：
```bash
npm run dev
```

后端将运行在 `http://localhost:5000`

### 2. 前端设置

```bash
cd client
npm install
```

启动前端应用：
```bash
npm start
```

前端将运行在 `http://localhost:3000`

## API 文档

### 用户相关
- `POST /api/users/register` - 用户注册
- `POST /api/users/login` - 用户登录
- `GET /api/users/profile` - 获取用户档案
- `PUT /api/users/profile` - 更新用户档案

### 医生相关
- `GET /api/doctors` - 获取所有医生
- `GET /api/doctors/:id` - 获取医生详情

### 预约相关
- `GET /api/appointments` - 获取用户的预约
- `POST /api/appointments` - 创建预约
- `PUT /api/appointments/:id` - 更新预约
- `DELETE /api/appointments/:id` - 取消预约

### 宠物和病历
- `GET /api/pets` - 获取用户的宠物
- `POST /api/pets` - 添加宠物
- `GET /api/pets/:id/records` - 获取宠物病历

### 在线咨询
- `GET /api/consultations` - 获取咨询列表
- `POST /api/consultations` - 提交咨询
- `POST /api/consultations/:id/reply` - 医生回复

### 商城
- `GET /api/shop/products` - 获取所有产品
- `POST /api/shop/orders` - 创建订单
- `GET /api/shop/orders` - 获取用户订单

## 技术栈

### 前端
- React 18.2
- React Router v6
- Ant Design UI 库
- Axios (HTTP 客户端)
- CSS3

### 后端
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT 认证
- bcryptjs (密码加密)

## 使用示例

### 注册新用户
```javascript
POST /api/users/register
{
  "name": "张三",
  "email": "zhangsan@example.com",
  "phone": "13800138000",
  "password": "password123"
}
```

### 创建预约
```javascript
POST /api/appointments
{
  "doctor": "doctor_id",
  "pet": "pet_id",
  "date": "2024-05-20",
  "time": "14:00",
  "symptoms": "宠物呕吐，食欲不振"
}
```

### 添加宠物
```javascript
POST /api/pets
{
  "name": "小白",
  "type": "dog",
  "breed": "金毛",
  "age": 3,
  "weight": 25
}
```

## 安全性考虑

- ✅ JWT 令牌认证
- ✅ 密码加密存储
- ✅ CORS 跨域资源共享
- ✅ 请求验证
- ✅ 环境变量保护敏感信息

## 部署建议

### 前端部署
```bash
npm run build
# 将 build 文件夹部署到 Vercel、Netlify 或其他静态托管服务
```

### 后端部署
- 使用 Heroku、AWS、DigitalOcean 等云服务
- 使用 MongoDB Atlas 作为云数据库
- 配置环境变量
- 使用 PM2 进程管理

## 常见问题

**Q: 如何重置密码？**
A: 当前版本不支持密码重置功能，需要通过管理员手动处理。

**Q: 支持多语言吗？**
A: 目前仅支持中文。

**Q: 如何添加支付功能？**
A: 可以集成支付宝或微信支付 API。

## 许可证

MIT License

## 联系方式

- 邮箱: support@pethospital.com
- 电话: 400-888-8888
