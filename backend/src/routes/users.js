const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');
const loggerMiddleware = require('../middleware/logger');

// 所有路由都需要认证和日志记录
router.use(authMiddleware);
router.use(loggerMiddleware);

router.get('/', userController.getUserList);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.put('/:id/status', userController.updateUserStatus);

module.exports = router;
