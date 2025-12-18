const { Log, User } = require('../models');
const { Op } = require('sequelize');

/**
 * 获取日志列表
 */
const getLogList = async (params) => {
  const { page = 1, pageSize = 10, keyword = '', startDate, endDate } = params;
  const offset = (page - 1) * pageSize;

  const where = {};

  if (keyword) {
    where[Op.or] = [
      { action: { [Op.like]: `%${keyword}%` } },
      { resource: { [Op.like]: `%${keyword}%` } }
    ];
  }

  if (startDate || endDate) {
    where.createdAt = {};
    if (startDate) {
      where.createdAt[Op.gte] = new Date(startDate);
    }
    if (endDate) {
      where.createdAt[Op.lte] = new Date(endDate);
    }
  }

  const { count, rows } = await Log.findAndCountAll({
    where,
    include: [{
      model: User,
      as: 'user',
      attributes: ['id', 'username', 'nickname']
    }],
    limit: pageSize,
    offset,
    order: [['createdAt', 'DESC']]
  });

  return {
    list: rows.map(log => ({
      id: log.id,
      userId: log.userId,
      user: log.user ? {
        id: log.user.id,
        username: log.user.username,
        nickname: log.user.nickname
      } : null,
      action: log.action,
      resource: log.resource,
      method: log.method,
      path: log.path,
      ip: log.ip,
      createdAt: log.createdAt
    })),
    total: count,
    page,
    pageSize
  };
};

module.exports = {
  getLogList
};

