const userService = require('../services/userService');
const { success, error } = require('../utils/response');

/**
 * 获取用户列表
 */
const getUserList = async (req, res) => {
  try {
    const result = await userService.getUserList(req.query);
    res.json(success(result, '获取成功'));
  } catch (err) {
    res.status(400).json(error(err.message, 400));
  }
};

/**
 * 创建用户
 */
const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.json(success(user, '创建成功'));
  } catch (err) {
    res.status(400).json(error(err.message, 400));
  }
};

/**
 * 更新用户
 */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.updateUser(id, req.body);
    res.json(success(user, '更新成功'));
  } catch (err) {
    res.status(400).json(error(err.message, 400));
  }
};

/**
 * 删除用户
 */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.json(success(null, '删除成功'));
  } catch (err) {
    res.status(400).json(error(err.message, 400));
  }
};

/**
 * 更新用户状态
 */
const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const user = await userService.updateUserStatus(id, status);
    res.json(success(user, '更新成功'));
  } catch (err) {
    res.status(400).json(error(err.message, 400));
  }
};

module.exports = {
  getUserList,
  createUser,
  updateUser,
  deleteUser,
  updateUserStatus,
};
