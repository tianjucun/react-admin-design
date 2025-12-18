const express = require('express');
const cors = require('cors');
const queryTypes = require('query-types');
const { sequelize, testConnection } = require('./config/database');
const { User, Role, Menu, RoleMenu, Log } = require('./models');

const app = express();

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 全局应用 query-types 中间件，自动转换查询参数类型
// 将字符串类型的数字、布尔值等自动转换为对应类型
app.use(queryTypes.middleware());

// 路由
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/roles', require('./routes/roles'));
app.use('/api/menus', require('./routes/menus'));
app.use('/api/logs', require('./routes/logs'));

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    code: 500,
    message: err.message || '服务器内部错误',
    data: null,
  });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({
    code: 404,
    message: '接口不存在',
    data: null,
  });
});

// 初始化数据库
const initDatabase = async () => {
  try {
    await testConnection();

    // 同步数据库表结构（开发环境）
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('数据库表结构同步成功');

      // 初始化默认数据
      await initDefaultData();
    }
  } catch (error) {
    console.error('数据库初始化失败:', error);
  }
};

// 初始化默认数据
const initDefaultData = async () => {
  try {
    // 检查是否已有数据
    const userCount = await User.count();
    if (userCount > 0) {
      return;
    }

    // 创建默认角色
    const adminRole = await Role.create({
      name: '管理员',
      code: 'admin',
      description: '系统管理员',
    });

    // 创建默认菜单
    const menus = await Menu.bulkCreate([
      {
        name: '系统管理',
        path: '/system',
        icon: 'SettingOutlined',
        type: 1,
        parentId: 0,
        sort: 1,
      },
      {
        name: '用户管理',
        path: '/system/user',
        icon: 'UserOutlined',
        type: 2,
        parentId: 1,
        sort: 1,
        permission: 'system:user',
      },
      {
        name: '角色管理',
        path: '/system/role',
        icon: 'TeamOutlined',
        type: 2,
        parentId: 1,
        sort: 2,
        permission: 'system:role',
      },
      {
        name: '菜单管理',
        path: '/system/menu',
        icon: 'MenuOutlined',
        type: 2,
        parentId: 1,
        sort: 3,
        permission: 'system:menu',
      },
      {
        name: '操作日志',
        path: '/system/log',
        icon: 'FileTextOutlined',
        type: 2,
        parentId: 1,
        sort: 4,
        permission: 'system:log',
      },
    ]);

    // 为管理员角色分配所有菜单权限
    await RoleMenu.bulkCreate(
      menus.map((menu) => ({ roleId: adminRole.id, menuId: menu.id }))
    );

    // 创建默认管理员用户（密码：admin123）
    await User.create({
      username: 'admin',
      password: 'admin123',
      nickname: '管理员',
      email: 'admin@example.com',
      status: 1,
      roleId: adminRole.id,
    });

    console.log('默认数据初始化成功');
    console.log('默认账号: admin / admin123');
  } catch (error) {
    console.error('初始化默认数据失败:', error);
  }
};

// 启动服务器
const PORT = process.env.PORT || 3000;

initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
  });
});

module.exports = app;
