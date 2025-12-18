import axios from 'axios';
import { message } from 'antd';
import { getToken, removeToken } from './auth';

const request = axios.create({
  baseURL: '/api',
  timeout: 10000
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    const { data } = response;
    
    // 如果响应格式是 { code, message, data }
    if (data.code !== undefined) {
      if (data.code === 200) {
        return data.data;
      } else {
        message.error(data.message || '请求失败');
        
        // Token 过期或无效，清除本地存储并跳转登录
        if (data.code === 401) {
          removeToken();
          window.location.href = '/login';
        }
        
        return Promise.reject(new Error(data.message || '请求失败'));
      }
    }
    
    return data;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      if (status === 401) {
        message.error('登录已过期，请重新登录');
        removeToken();
        window.location.href = '/login';
      } else if (status === 403) {
        message.error('没有权限访问');
      } else if (status === 404) {
        message.error('接口不存在');
      } else if (status >= 500) {
        message.error('服务器错误');
      } else {
        message.error(data?.message || '请求失败');
      }
    } else {
      message.error('网络错误，请检查网络连接');
    }
    
    return Promise.reject(error);
  }
);

export default request;

