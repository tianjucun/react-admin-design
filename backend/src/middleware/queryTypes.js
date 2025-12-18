/**
 * query-types 中间件配置
 * 
 * 注意：此中间件已在 app.js 中全局应用
 * 如需自定义配置，可以在这里扩展
 */

const queryTypes = require('query-types');

/**
 * 创建 query-types 中间件
 * 可以在这里添加自定义配置
 */
const queryTypesMiddleware = () => {
  return queryTypes.middleware();
};

module.exports = queryTypesMiddleware;

