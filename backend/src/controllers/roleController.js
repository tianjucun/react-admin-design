const roleService = require('../services/roleService');
const { success, error } = require('../utils/response');

/**
 * 获取角色列表
 */
const getRoleList = async (req, res) => {
  try {
    const roles = await roleService.getRoleList(req.query);
    res.json(success(roles, '获取成功'));
  } catch (err) {
    res.status(400).json(error(err.message, 400));
  }
};

const getAllRoleOptions = async (_, res) => {
  try {
    const roles = await roleService.getAllRoleOptions();
    res.json(success(roles, '获取成功'));
  } catch (err) {
    res.status(400).json(error(err.message, 400));
  }
};

/**
 * 获取角色详情
 */
const getRoleDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await roleService.getRoleDetail(id);
    res.json(success(role, '获取成功'));
  } catch (err) {
    res.status(400).json(error(err.message, 400));
  }
};

/**
 * 创建角色
 */
const createRole = async (req, res) => {
  try {
    const role = await roleService.createRole(req.body);
    res.json(success(role, '创建成功'));
  } catch (err) {
    res.status(400).json(error(err.message, 400));
  }
};

/**
 * 更新角色
 */
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await roleService.updateRole(id, req.body);
    res.json(success(role, '更新成功'));
  } catch (err) {
    res.status(400).json(error(err.message, 400));
  }
};

/**
 * 删除角色
 */
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    await roleService.deleteRole(id);
    res.json(success(null, '删除成功'));
  } catch (err) {
    res.status(400).json(error(err.message, 400));
  }
};

/**
 * 分配权限
 */
const assignPermissions = async (req, res) => {
  try {
    const { id } = req.params;
    const { menuIds } = req.body;
    await roleService.assignPermissions(id, menuIds);
    res.json(success(null, '分配成功'));
  } catch (err) {
    res.status(400).json(error(err.message, 400));
  }
};

module.exports = {
  getRoleList,
  getRoleDetail,
  createRole,
  updateRole,
  deleteRole,
  assignPermissions,
  getAllRoleOptions,
};
