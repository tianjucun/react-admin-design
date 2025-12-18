const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// 登录（不需要认证）
router.post('/login', authController.login);

// 获取用户信息（需要认证）
router.get('/info', authMiddleware, authController.getInfo);

// 退出登录
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;

