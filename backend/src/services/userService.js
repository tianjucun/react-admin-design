const { User, Role } = require('../models');
const { Op } = require('sequelize');

/**
 * 获取用户列表
 */
const getUserList = async (params) => {
  const { page = 1, pageSize = 10, keyword = '' } = params;
  const offset = (page - 1) * pageSize;

  const where = {};
  if (keyword) {
    where[Op.or] = [
      { username: { [Op.like]: `%${keyword}%` } },
      { nickname: { [Op.like]: `%${keyword}%` } },
      { email: { [Op.like]: `%${keyword}%` } },
    ];
  }

  const { count, rows } = await User.findAndCountAll({
    where,
    include: [
      {
        model: Role,
        as: 'role',
        attributes: ['id', 'name', 'code'],
      },
    ],
    limit: pageSize,
    offset,
    order: [['createdAt', 'DESC']],
  });

  return {
    list: rows.map((user) => ({
      id: user.id,
      username: user.username,
      nickname: user.nickname,
      email: user.email,
      status: user.status,
      roleId: user.roleId,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })),
    total: count,
    page,
    pageSize,
  };
};

/**
 * 创建用户
 */
const createUser = async (userData) => {
  const { username, password, nickname, email, roleId, status = 1 } = userData;

  // 检查用户名是否已存在
  const existUser = await User.findOne({ where: { username } });
  if (existUser) {
    throw new Error('用户名已存在');
  }

  const user = await User.create({
    username,
    password,
    nickname,
    email,
    roleId,
    status,
  });

  return user;
};

/**
 * 更新用户
 */
const updateUser = async (id, userData) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('用户不存在');
  }

  const { username, nickname, email, roleId, status } = userData;

  // 如果修改用户名，检查是否重复
  if (username && username !== user.username) {
    const existUser = await User.findOne({ where: { username } });
    if (existUser) {
      throw new Error('用户名已存在');
    }
  }

  await user.update({
    username: username || user.username,
    nickname: nickname !== undefined ? nickname : user.nickname,
    email: email !== undefined ? email : user.email,
    roleId: roleId !== undefined ? roleId : user.roleId,
    status: status !== undefined ? status : user.status,
  });

  return user;
};

/**
 * 删除用户
 */
const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('用户不存在');
  }

  await user.destroy();
  return true;
};

/**
 * 更新用户状态
 */
const updateUserStatus = async (id, status) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error('用户不存在');
  }

  await user.update({ status });
  return user;
};

module.exports = {
  getUserList,
  createUser,
  updateUser,
  deleteUser,
  updateUserStatus,
};
