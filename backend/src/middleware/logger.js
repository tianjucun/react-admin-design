const { Log } = require('../models');

/**
 * 操作日志中间件
 */
const loggerMiddleware = async (req, res, next) => {
  const originalSend = res.send;
  
  res.send = function(data) {
    // 记录日志（异步，不阻塞响应）
    setImmediate(async () => {
      try {
        if (req.user && req.method !== 'GET') {
          await Log.create({
            userId: req.user.id,
            action: getActionName(req.method, req.path),
            resource: req.path,
            method: req.method,
            path: req.originalUrl,
            ip: req.ip || req.connection.remoteAddress
          });
        }
      } catch (err) {
        console.error('日志记录失败:', err);
      }
    });
    
    return originalSend.call(this, data);
  };
  
  next();
};

/**
 * 根据请求方法和路径获取操作名称
 */
const getActionName = (method, path) => {
  const actionMap = {
    'POST': '创建',
    'PUT': '更新',
    'DELETE': '删除',
    'GET': '查询'
  };
  
  const resourceMap = {
    '/api/users': '用户',
    '/api/roles': '角色',
    '/api/menus': '菜单',
    '/api/auth': '认证'
  };
  
  const resource = Object.keys(resourceMap).find(key => path.startsWith(key));
  const resourceName = resource ? resourceMap[resource] : '资源';
  
  return `${actionMap[method] || method}${resourceName}`;
};

module.exports = loggerMiddleware;

