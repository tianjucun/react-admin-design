const authService = require('../services/authService');
const { success, error } = require('../utils/response');

/**
 * 用户登录
 */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json(error('用户名和密码不能为空', 400));
    }

    const result = await authService.login(username, password);
    res.json(success(result, '登录成功'));
  } catch (err) {
    res.status(400).json(error(err.message, 400));
  }
};

/**
 * 获取当前用户信息
 */
const getInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const userInfo = await authService.getUserInfo(userId);
    res.json(success(userInfo, '获取成功'));
  } catch (err) {
    res.status(400).json(error(err.message, 400));
  }
};

/**
 * 退出登录
 */
const logout = async (req, res) => {
  res.json(success(null, '退出成功'));
};

module.exports = {
  login,
  getInfo,
  logout
};

