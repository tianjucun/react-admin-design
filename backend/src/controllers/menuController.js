const menuService = require('../services/menuService');
const { success, error } = require('../utils/response');

/**
 * 获取菜单树
 */
const getMenuTree = async (req, res) => {
  try {
    const menus = await menuService.getMenuTree();
    res.json(success(menus, '获取成功'));
  } catch (err) {
    res.status(400).json(error(err.message, 400));
  }
};

/**
 * 获取所有菜单
 */
const getAllMenus = async (req, res) => {
  try {
    const menus = await menuService.getAllMenus();
    res.json(success(menus, '获取成功'));
  } catch (err) {
    res.status(400).json(error(err.message, 400));
  }
};

/**
 * 创建菜单
 */
const createMenu = async (req, res) => {
  try {
    const menu = await menuService.createMenu(req.body);
    res.json(success(menu, '创建成功'));
  } catch (err) {
    res.status(400).json(error(err.message, 400));
  }
};

/**
 * 更新菜单
 */
const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await menuService.updateMenu(id, req.body);
    res.json(success(menu, '更新成功'));
  } catch (err) {
    res.status(400).json(error(err.message, 400));
  }
};

/**
 * 删除菜单
 */
const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    await menuService.deleteMenu(id);
    res.json(success(null, '删除成功'));
  } catch (err) {
    res.status(400).json(error(err.message, 400));
  }
};

module.exports = {
  getMenuTree,
  getAllMenus,
  createMenu,
  updateMenu,
  deleteMenu
};

