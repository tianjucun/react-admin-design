const { verifyToken } = require('../utils/jwt');
const { error } = require('../utils/response');

/**
 * JWT 认证中间件
 */
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '') || req.headers.token;

  if (!token) {
    return res.status(401).json(error('未提供认证令牌', 401));
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json(error('认证令牌无效或已过期', 401));
  }

  req.user = decoded;
  next();
};

module.exports = authMiddleware;

