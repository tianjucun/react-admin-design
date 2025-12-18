# 基础后台管理系统

基于 Node.js + Express 和 React + Ant Design 的后台管理系统。

## 技术栈

### 后端
- Node.js + Express.js
- MySQL + Sequelize ORM
- JWT 认证
- bcryptjs 密码加密

### 前端
- React 18
- Ant Design 5.x
- React Router v6
- Axios
- Zustand 状态管理
- Vite 构建工具

## 项目结构

```
code-react-admin-design/
├── backend/          # 后端项目
├── frontend/         # 前端项目
└── plan.md          # 项目规划文档
```

## 快速开始

### 环境要求
- Node.js >= 16.0.0
- MySQL >= 5.7

### 后端启动

1. 进入后端目录
```bash
cd backend
```

2. 安装依赖
```bash
npm install
```

3. 配置数据库
   - 创建 MySQL 数据库（如：admin_db）
   - 复制 `.env.example` 为 `.env`（如果存在）
   - 修改 `backend/.env` 文件中的数据库配置：
   ```
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=admin_db
   DB_USER=root
   DB_PASSWORD=your_password
   ```

4. 启动服务
```bash
npm run dev
```

后端服务将运行在 `http://localhost:3000`

### 前端启动

1. 进入前端目录
```bash
cd frontend
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

前端应用将运行在 `http://localhost:5173`

## 默认账号

- 用户名：`admin`
- 密码：`admin123`

## 功能模块

- ✅ 用户认证（登录、JWT Token）
- ✅ 用户管理（增删改查、状态管理）
- ✅ 角色管理（增删改查、权限分配）
- ✅ 菜单管理（树形结构、增删改查）
- ✅ 操作日志（记录、查询、筛选）

## API 接口

### 认证接口
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/info` - 获取当前用户信息
- `POST /api/auth/logout` - 退出登录

### 用户管理接口
- `GET /api/users` - 获取用户列表
- `POST /api/users` - 创建用户
- `PUT /api/users/:id` - 更新用户
- `DELETE /api/users/:id` - 删除用户
- `PUT /api/users/:id/status` - 更新用户状态

### 角色管理接口
- `GET /api/roles` - 获取角色列表
- `GET /api/roles/:id` - 获取角色详情
- `POST /api/roles` - 创建角色
- `PUT /api/roles/:id` - 更新角色
- `DELETE /api/roles/:id` - 删除角色
- `POST /api/roles/:id/permissions` - 分配权限

### 菜单管理接口
- `GET /api/menus` - 获取菜单树
- `GET /api/menus/all` - 获取所有菜单
- `POST /api/menus` - 创建菜单
- `PUT /api/menus/:id` - 更新菜单
- `DELETE /api/menus/:id` - 删除菜单

### 日志接口
- `GET /api/logs` - 获取日志列表

## 开发说明

### 数据库初始化
后端启动时会自动创建数据表并初始化默认数据（仅在开发环境）。

### 环境变量
后端需要配置 `.env` 文件，包含：
- 数据库连接信息
- JWT 密钥
- 服务器端口

### 跨域配置
前端开发服务器已配置代理，将 `/api` 请求代理到后端服务器。

## 注意事项

1. 生产环境请修改 JWT_SECRET 为强密钥
2. 生产环境请关闭数据库自动同步（`sequelize.sync`）
3. 建议使用环境变量管理敏感配置
4. 密码使用 bcryptjs 加密存储

## License

ISC

