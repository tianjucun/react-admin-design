const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    comment: '用户名'
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    comment: '密码',
    set(value) {
      // 密码加密
      const hash = bcrypt.hashSync(value, 10);
      this.setDataValue('password', hash);
    }
  },
  nickname: {
    type: DataTypes.STRING(50),
    allowNull: true,
    comment: '昵称'
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: '邮箱'
  },
  status: {
    type: DataTypes.TINYINT,
    defaultValue: 1,
    comment: '状态：0-禁用，1-启用'
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '角色ID'
  }
}, {
  tableName: 'users',
  timestamps: true,
  underscored: false
});

// 实例方法：验证密码
User.prototype.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = User;

