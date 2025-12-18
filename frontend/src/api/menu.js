import request from '../utils/request';

/**
 * 获取菜单树
 */
export const getMenuTree = () => {
  return request.get('/menus');
};

/**
 * 获取所有菜单
 */
export const getAllMenus = () => {
  return request.get('/menus/all');
};

/**
 * 创建菜单
 */
export const createMenu = (data) => {
  return request.post('/menus', data);
};

/**
 * 更新菜单
 */
export const updateMenu = (id, data) => {
  return request.put(`/menus/${id}`, data);
};

/**
 * 删除菜单
 */
export const deleteMenu = (id) => {
  return request.delete(`/menus/${id}`);
};

