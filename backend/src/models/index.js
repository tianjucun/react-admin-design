const User = require('./User');
const Role = require('./Role');
const Menu = require('./Menu');
const RoleMenu = require('./RoleMenu');
const Log = require('./Log');

// 定义关联关系
User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
Role.hasMany(User, { foreignKey: 'roleId', as: 'users' });

Role.belongsToMany(Menu, { through: RoleMenu, foreignKey: 'roleId', as: 'menus' });
Menu.belongsToMany(Role, { through: RoleMenu, foreignKey: 'menuId', as: 'roles' });

Menu.hasMany(Menu, { foreignKey: 'parentId', as: 'children' });
Menu.belongsTo(Menu, { foreignKey: 'parentId', as: 'parent' });

Log.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Log, { foreignKey: 'userId', as: 'logs' });

module.exports = {
  User,
  Role,
  Menu,
  RoleMenu,
  Log
};

