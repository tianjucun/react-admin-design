const { Menu, Role } = require('../models');
const { Op } = require('sequelize');

/**
 * 构建菜单树
 */
const buildMenuTree = (menus, parentId = 0) => {
  return menus
    .filter(menu => menu.parentId === parentId)
    .map(menu => ({
      id: menu.id,
      name: menu.name,
      path: menu.path,
      icon: menu.icon,
      type: menu.type,
      parentId: menu.parentId,
      sort: menu.sort,
      permission: menu.permission,
      children: buildMenuTree(menus, menu.id)
    }))
    .sort((a, b) => a.sort - b.sort);
};

/**
 * 获取菜单树
 */
const getMenuTree = async () => {
  const menus = await Menu.findAll({
    order: [['sort', 'ASC'], ['createdAt', 'ASC']]
  });

  return buildMenuTree(menus);
};

/**
 * 获取所有菜单（扁平结构）
 */
const getAllMenus = async () => {
  const menus = await Menu.findAll({
    order: [['sort', 'ASC'], ['createdAt', 'ASC']]
  });

  return menus;
};

/**
 * 创建菜单
 */
const createMenu = async (menuData) => {
  const { name, path, icon, type, parentId = 0, sort = 0, permission } = menuData;

  const menu = await Menu.create({
    name,
    path,
    icon,
    type,
    parentId,
    sort,
    permission
  });

  return menu;
};

/**
 * 更新菜单
 */
const updateMenu = async (id, menuData) => {
  const menu = await Menu.findByPk(id);
  if (!menu) {
    throw new Error('菜单不存在');
  }

  const { name, path, icon, type, parentId, sort, permission } = menuData;

  // 检查父菜单不能是自己
  if (parentId === id) {
    throw new Error('父菜单不能是自己');
  }

  await menu.update({
    name: name || menu.name,
    path: path !== undefined ? path : menu.path,
    icon: icon !== undefined ? icon : menu.icon,
    type: type !== undefined ? type : menu.type,
    parentId: parentId !== undefined ? parentId : menu.parentId,
    sort: sort !== undefined ? sort : menu.sort,
    permission: permission !== undefined ? permission : menu.permission
  });

  return menu;
};

/**
 * 删除菜单
 */
const deleteMenu = async (id) => {
  const menu = await Menu.findByPk(id);
  if (!menu) {
    throw new Error('菜单不存在');
  }

  // 检查是否有子菜单
  const children = await Menu.count({ where: { parentId: id } });
  if (children > 0) {
    throw new Error('该菜单下存在子菜单，无法删除');
  }

  await menu.destroy();
  return true;
};

module.exports = {
  getMenuTree,
  getAllMenus,
  createMenu,
  updateMenu,
  deleteMenu
};

