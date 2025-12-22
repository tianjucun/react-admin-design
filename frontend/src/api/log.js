import request from '@/utils/request';

/**
 * 获取日志列表
 */
export const getLogList = (params) => {
  return request.get('/logs', { params });
};
