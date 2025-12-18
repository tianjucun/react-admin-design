const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const authMiddleware = require('../middleware/auth');
const loggerMiddleware = require('../middleware/logger');

// 所有路由都需要认证和日志记录
router.use(authMiddleware);
router.use(loggerMiddleware);

router.get('/', menuController.getMenuTree);
router.get('/all', menuController.getAllMenus);
router.post('/', menuController.createMenu);
router.put('/:id', menuController.updateMenu);
router.delete('/:id', menuController.deleteMenu);

module.exports = router;

