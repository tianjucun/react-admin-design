/**
 * 用户管理模块常量定义
 */

// 用户状态枚举
export const USER_STATUS = {
  ENABLED: 1,
  DISABLED: 0,
};

export const WITH_ALL_USER_STATUS = {
  ALL: -1,
  ...USER_STATUS,
};

// 用户状态文本映射
export const USER_STATUS_TEXT = {
  [WITH_ALL_USER_STATUS.ALL]: '全部',
  [USER_STATUS.ENABLED]: '启用',
  [USER_STATUS.DISABLED]: '禁用',
};

// 用户状态颜色映射
export const USER_STATUS_COLOR = {
  [USER_STATUS.ENABLED]: '#52c41a',
  [USER_STATUS.DISABLED]: '#ff4d4f',
};

// 表单验证规则
export const FORM_RULES = {
  username: [
    { required: true, message: '请输入用户名' },
    { min: 3, message: '用户名至少3个字符' },
    { max: 20, message: '用户名最多20个字符' },
  ],
  password: [
    { required: true, message: '请输入密码' },
    { min: 6, message: '密码至少6个字符' },
  ],
  nickname: [{ max: 50, message: '昵称最多50个字符' }],
  email: [{ type: 'email', message: '请输入正确的邮箱格式' }],
};

// 默认分页配置
export const DEFAULT_PAGINATION = {
  current: 1,
  pageSize: 10,
};

// 表格列配置
export const TABLE_COLUMNS_CONFIG = {
  id: { width: 80 },
  action: { width: 200, fixed: 'right' },
};
