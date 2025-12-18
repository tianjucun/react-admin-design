/**
 * 用户数据格式化工具函数
 */

import { USER_STATUS, USER_STATUS_TEXT, USER_STATUS_COLOR } from '../constants';

/**
 * 格式化用户状态显示
 * @param {number} status - 用户状态
 * @returns {object} 包含文本和颜色的对象
 */
export const formatUserStatus = (status) => {
  return {
    text: USER_STATUS_TEXT[status] || '未知',
    color: USER_STATUS_COLOR[status] || '#999',
  };
};

/**
 * 获取状态切换后的值
 * @param {number} currentStatus - 当前状态
 * @returns {number} 切换后的状态
 */
export const toggleUserStatus = (currentStatus) => {
  return currentStatus === USER_STATUS.ENABLED
    ? USER_STATUS.DISABLED
    : USER_STATUS.ENABLED;
};
