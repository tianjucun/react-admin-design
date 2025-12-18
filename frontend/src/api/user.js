import request from '../utils/request';

/**
 * 获取用户列表
 */
export const getUserList = (params) => {
  return request.get('/users', { params });
};

/**
 * 创建用户
 */
export const createUser = (data) => {
  return request.post('/users', data);
};

/**
 * 更新用户
 */
export const updateUser = (id, data) => {
  return request.put(`/users/${id}`, data);
};

/**
 * 删除用户
 */
export const deleteUser = (id) => {
  return request.delete(`/users/${id}`);
};

/**
 * 更新用户状态
 */
export const updateUserStatus = (id, status) => {
  return request.put(`/users/${id}/status`, { status });
};

