const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Menu = sequelize.define('Menu', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: '菜单名称'
  },
  path: {
    type: DataTypes.STRING(200),
    allowNull: true,
    comment: '路由路径'
  },
  icon: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: '图标'
  },
  type: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1,
    comment: '类型：1-目录，2-菜单，3-按钮'
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    comment: '父菜单ID'
  },
  sort: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: '排序'
  },
  permission: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: '权限标识'
  }
}, {
  tableName: 'menus',
  timestamps: true,
  underscored: false
});

module.exports = Menu;

