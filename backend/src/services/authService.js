const { User, Role, Menu } = require('../models');
const { generateToken } = require('../utils/jwt');

/**
 * 用户登录
 */
const login = async (username, password) => {
  const user = await User.findOne({
    where: { username },
    include: [
      {
        model: Role,
        as: 'role',
        include: [
          {
            model: Menu,
            as: 'menus',
          },
        ],
      },
    ],
  });

  if (!user) {
    throw new Error('用户不存在');
  }

  if (user.status === 0) {
    throw new Error('账户已被禁用');
  }

  if (!user.validatePassword(password)) {
    throw new Error('用户名或密码错误');
  }

  // 生成 Token
  const token = generateToken({
    id: user.id,
    username: user.username,
    roleId: user.roleId,
  });

  // 获取用户菜单权限
  const menus = user.role?.menus || [];

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      email: user.email,
      role: user.role
        ? {
            id: user.role.id,
            name: user.role.name,
            code: user.role.code,
          }
        : null,
      menus: menus.map((menu) => ({
        id: menu.id,
        name: menu.name,
        path: menu.path,
        icon: menu.icon,
        type: menu.type,
        parentId: menu.parentId,
        permission: menu.permission,
      })),
    },
  };
};

/**
 * 获取用户信息
 */
const getUserInfo = async (userId) => {
  const user = await User.findByPk(userId, {
    include: [
      {
        model: Role,
        as: 'role',
        include: [
          {
            model: Menu,
            as: 'menus',
          },
        ],
      },
    ],
  });

  if (!user) {
    throw new Error('用户不存在');
  }

  const menus = user.role?.menus || [];

  return {
    id: user.id,
    username: user.username,
    nickname: user.nickname,
    email: user.email,
    role: user.role
      ? {
          id: user.role.id,
          name: user.role.name,
          code: user.role.code,
        }
      : null,
    menus: menus.map((menu) => ({
      id: menu.id,
      name: menu.name,
      path: menu.path,
      icon: menu.icon,
      type: menu.type,
      parentId: menu.parentId,
      permission: menu.permission,
    })),
  };
};

module.exports = {
  login,
  getUserInfo,
};
