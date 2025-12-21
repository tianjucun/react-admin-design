const { Role, Menu, RoleMenu } = require('../models');

/**
 * 获取角色列表
 */
const getRoleList = async (params) => {
  const { page = 1, pageSize = 10 } = params;
  const offset = (page - 1) * pageSize;

  const { count, rows } = await Role.findAndCountAll({
    offset,
    limit: pageSize,
    order: [['createdAt', 'DESC']],
  });

  return {
    list: rows,
    total: count,
    page,
    pageSize,
  };
};

/**
 * 获取角色详情（包含权限）
 */
const getRoleDetail = async (id) => {
  const role = await Role.findByPk(id, {
    include: [
      {
        model: Menu,
        as: 'menus',
        attributes: ['id'],
      },
    ],
  });

  if (!role) {
    throw new Error('角色不存在');
  }

  return {
    id: role.id,
    name: role.name,
    code: role.code,
    description: role.description,
    menuIds: role.menus.map((menu) => menu.id),
    createdAt: role.createdAt,
    updatedAt: role.updatedAt,
  };
};

/**
 * 创建角色
 */
const createRole = async (roleData) => {
  const { name, code, description } = roleData;

  // 检查角色编码是否已存在
  const existRole = await Role.findOne({ where: { code } });
  if (existRole) {
    throw new Error('角色编码已存在');
  }

  const role = await Role.create({
    name,
    code,
    description,
  });

  return role;
};

/**
 * 更新角色
 */
const updateRole = async (id, roleData) => {
  const role = await Role.findByPk(id);
  if (!role) {
    throw new Error('角色不存在');
  }

  const { name, code, description } = roleData;

  // 如果修改角色编码，检查是否重复
  if (code && code !== role.code) {
    const existRole = await Role.findOne({ where: { code } });
    if (existRole) {
      throw new Error('角色编码已存在');
    }
  }

  await role.update({
    name: name || role.name,
    code: code || role.code,
    description: description !== undefined ? description : role.description,
  });

  return role;
};

/**
 * 删除角色
 */
const deleteRole = async (id) => {
  const role = await Role.findByPk(id);
  if (!role) {
    throw new Error('角色不存在');
  }

  await role.destroy();
  return true;
};

/**
 * 分配权限
 */
const assignPermissions = async (roleId, menuIds) => {
  const role = await Role.findByPk(roleId);
  if (!role) {
    throw new Error('角色不存在');
  }

  // 删除原有权限
  await RoleMenu.destroy({ where: { roleId } });

  // 添加新权限
  if (menuIds && menuIds.length > 0) {
    await RoleMenu.bulkCreate(menuIds.map((menuId) => ({ roleId, menuId })));
  }

  return true;
};

module.exports = {
  getRoleList,
  getRoleDetail,
  createRole,
  updateRole,
  deleteRole,
  assignPermissions,
};
