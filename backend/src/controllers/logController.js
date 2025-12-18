const logService = require('../services/logService');
const { success, error } = require('../utils/response');

/**
 * 获取日志列表
 */
const getLogList = async (req, res) => {
  try {
    const result = await logService.getLogList(req.query);
    res.json(success(result, '获取成功'));
  } catch (err) {
    res.status(400).json(error(err.message, 400));
  }
};

module.exports = {
  getLogList
};

