import request from '../utils/request';

/**
 * 用户登录
 */
export const login = (username, password) => {
  return request.post('/auth/login', { username, password });
};

/**
 * 获取当前用户信息
 */
export const getInfo = () => {
  return request.get('/auth/info');
};

/**
 * 退出登录
 */
export const logout = () => {
  return request.post('/auth/logout');
};

