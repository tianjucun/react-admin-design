const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const RoleMenu = sequelize.define('RoleMenu', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '角色ID'
  },
  menuId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '菜单ID'
  }
}, {
  tableName: 'role_menus',
  timestamps: false
});

module.exports = RoleMenu;

