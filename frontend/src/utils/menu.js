import React from 'react';
import * as Icons from '@ant-design/icons';

/**
 * 图标映射表
 * 将字符串图标名称映射到实际的图标组件
 */
const IconMap = {
  UserOutlined: Icons.UserOutlined,
  SettingOutlined: Icons.SettingOutlined,
  LogoutOutlined: Icons.LogoutOutlined,
  TeamOutlined: Icons.TeamOutlined,
  MenuOutlined: Icons.MenuOutlined,
  FileTextOutlined: Icons.FileTextOutlined,
  HomeOutlined: Icons.HomeOutlined,
  DashboardOutlined: Icons.DashboardOutlined,
  // 可以根据需要添加更多图标
};

/**
 * 获取图标组件
 * @param {string} iconName - 图标名称
 * @returns {React.Component|null}
 */
const getIcon = (iconName) => {
  if (!iconName) return null;
  const IconComponent = IconMap[iconName];
  return IconComponent ? React.createElement(IconComponent) : null;
};

/**
 * 将拍平的菜单数组转换为树形结构
 * @param {Array} flatMenus - 拍平的菜单数组
 * @param {number} parentId - 父菜单ID，默认为0（根节点）
 * @returns {Array} 树形结构的菜单数组
 */
const buildMenuTree = (flatMenus, parentId = 0) => {
  return flatMenus
    .filter((menu) => menu.parentId === parentId)
    .map((menu) => ({
      ...menu,
      children: buildMenuTree(flatMenus, menu.id),
    }))
    .sort((a, b) => a.sort - b.sort);
};

/**
 * 将菜单数据转换为 Ant Design Menu 组件需要的格式
 * @param {Array} menus - 菜单数组（可以是拍平的或树形的）
 * @param {boolean} isFlat - 是否为拍平的数据，默认true
 * @returns {Array} Ant Design Menu items
 */
const convertToMenuItems = (menus, isFlat = true) => {
  if (!menus || menus.length === 0) {
    return [];
  }

  // 如果是拍平的数据，先转换为树形结构
  let menuTree = isFlat ? buildMenuTree(menus) : menus;

  // 过滤掉按钮类型的菜单（只显示目录和菜单）
  menuTree = menuTree.filter((menu) => menu.type !== 3);

  // 转换为 Ant Design Menu 格式
  const convertMenu = (menu) => {
    // 确保 key 是完整路径，用于路由导航和选中状态
    let menuKey = menu.path || `menu-${menu.id}`;
    // 如果路径不是以 / 开头，添加 /
    if (menuKey && !menuKey.startsWith('/')) {
      menuKey = `/${menuKey}`;
    }

    const menuItem = {
      key: menuKey,
      label: menu.name,
      icon: getIcon(menu.icon),
    };

    // 如果有子菜单，递归处理
    if (menu.children && menu.children.length > 0) {
      // 过滤子菜单中的按钮类型
      const children = menu.children
        .filter((child) => child.type !== 3)
        .map((child) => convertMenu(child));

      if (children.length > 0) {
        menuItem.children = children;
      }
    }

    return menuItem;
  };

  return menuTree.map((menu) => convertMenu(menu));
};

/**
 * 从拍平的菜单数据中获取所有路径（用于路由配置）
 * @param {Array} flatMenus - 拍平的菜单数组
 * @returns {Array} 路径数组
 */
const getMenuPaths = (flatMenus) => {
  if (!flatMenus || flatMenus.length === 0) {
    return [];
  }

  return flatMenus
    .filter((menu) => menu.type === 2 && menu.path) // 只获取菜单类型的路径
    .map((menu) => menu.path);
};

export { buildMenuTree, convertToMenuItems, getMenuPaths, getIcon, IconMap };
