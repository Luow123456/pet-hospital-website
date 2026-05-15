# 宠物医院网站 - 项目架构说明

## 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Pages: Home, Doctors, Appointment, PetRecords...     │  │
│  │  Components: Doctor Cards, Forms, Tables...           │  │
│  │  Services: API Service with Axios & JWT Auth          │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          ↓ HTTP(S)
┌─────────────────────────────────────────────────────────────┐
│                  Backend (Node.js + Express)                │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Routes: /api/users, /api/doctors, /api/appointments  │  │
│  │  Controllers: CRUD Operations                          │  │
│  │  Middleware: Authentication, Validation               │  │
│  │  Models: User, Doctor, Pet, Appointment, etc.         │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          ↓ 
┌─────────────────────────────────────────────────────────────┐
│                    MongoDB Database                         │
│  Collections: users, doctors, appointments, pets, etc.     │
└─────────────────────────────────────────────────────────────┘
```

## 功能模块

### 1. 用户管理模块
- 用户注册和登录
- JWT 令牌认证
- 用户档案管理
- 密码加密存储

### 2. 医生管理模块
- 医生信息展示
- 医生专科分类
- 医生日程管理
- 医生经验和资质

### 3. 预约管理模块
- 在线预约挂号
- 预约状态跟踪
- 预约修改和取消
- 预约提醒

### 4. 宠物管理模块
- 宠物信息管理
- 病历记录
- 就诊历史
- 健康档案

### 5. 咨询模块
- 在线提问
- 医生回复
- 咨询历史
- 咨询状态

### 6. 商城模块
- 产品展示
- 在线购物
- 订单管理
- 支付处理

## 数据库设计

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  address: String,
  city: String,
  createdAt: Date
}
```

### Doctor Schema
```javascript
{
  name: String,
  email: String,
  specialty: String,
  qualification: String,
  experience: Number,
  introduction: String,
  avatar: String,
  schedule: Object
}
```

### Appointment Schema
```javascript
{
  user: ObjectId (ref: User),
  doctor: ObjectId (ref: Doctor),
  pet: ObjectId (ref: Pet),
  date: Date,
  time: String,
  symptoms: String,
  status: String (pending/confirmed/completed/cancelled)
}
```

### Pet Schema
```javascript
{
  user: ObjectId (ref: User),
  name: String,
  type: String,
  breed: String,
  age: Number,
  weight: Number,
  color: String
}
```

## API 安全性

### 认证方式
- 使用 JWT (JSON Web Tokens)
- 令牌存储在 localStorage
- 每个受保护的请求都需要有效的令牌

### 密码安全
- 使用 bcryptjs 加密
- 盐值 10 轮加密
- 数据库中不存储明文密码

### CORS 配置
- 允许来自指定源的请求
- 生产环境需要配置特定域名

## 前端状态管理

### Local Storage
- 用户令牌存储
- 用户信息缓存

### React State
- 页面组件状态
- 表单数据
- 加载状态

## 性能优化

### 前端
- 代码分割和懒加载
- 组件按需加载
- 缓存 API 响应

### 后端
- 数据库索引优化
- 连接池管理
- 响应压缩

## 部署建议

### 前端部署
1. 运行 `npm run build` 生成生产文件
2. 上传到 CDN 或静态托管服务
3. 配置环境变量

### 后端部署
1. 使用 PM2 进程管理
2. 配置反向代理 (Nginx)
3. 启用 HTTPS
4. 配置数据库备份

## 扩展功能建议

- [ ] 支付宝/微信支付集成
- [ ] 第三方登录（微信、支付宝）
- [ ] 短信/邮件通知
- [ ] 管理后台
- [ ] 数据分析和报表
- [ ] 视频咨询功能
- [ ] 移动应用版本
- [ ] 多语言支持

## 监控和日志

### 后端日志
- 请求日志
- 错误日志
- 性能监控

### 前端监控
- 错误跟踪
- 用户行为分析
- 性能监控
