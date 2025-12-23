const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const authMiddleware = require('../middleware/auth');
const loggerMiddleware = require('../middleware/logger');

// 所有路由都需要认证和日志记录
router.use(authMiddleware);
router.use(loggerMiddleware);

router.get('/', roleController.getRoleList);
router.get('/options', roleController.getAllRoleOptions);
router.get('/:id', roleController.getRoleDetail);
router.post('/', roleController.createRole);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);
router.post('/:id/permissions', roleController.assignPermissions);

module.exports = router;
