const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Log = sequelize.define('Log', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '用户ID'
  },
  action: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: '操作类型'
  },
  resource: {
    type: DataTypes.STRING(200),
    allowNull: true,
    comment: '操作资源'
  },
  method: {
    type: DataTypes.STRING(10),
    allowNull: true,
    comment: '请求方法'
  },
  path: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: '请求路径'
  },
  ip: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: 'IP地址'
  }
}, {
  tableName: 'logs',
  timestamps: true,
  createdAt: 'createdAt',
  updatedAt: false
});

module.exports = Log;

