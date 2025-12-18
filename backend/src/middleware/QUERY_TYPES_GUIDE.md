# query-types 中间件使用指南

## 概述

`query-types` 是一个自动将 HTTP 查询参数从字符串转换为相应类型的中间件。例如：
- `?page=1` → `page: 1` (数字)
- `?pageSize=10` → `pageSize: 10` (数字)
- `?isActive=true` → `isActive: true` (布尔值)

## 全局配置方案（推荐）

### 当前实现

在 `app.js` 中全局应用中间件：

```javascript
const queryTypes = require('query-types');

// 全局应用，所有路由自动处理
app.use(queryTypes.middleware());
```

### 优点

- ✅ **统一管理** - 所有路由自动处理，无需重复配置
- ✅ **减少代码** - 不需要在每个路由文件中单独引入
- ✅ **易于维护** - 修改配置只需在一个地方
- ✅ **性能优化** - 中间件只执行一次

### 使用示例

```javascript
// 前端请求
GET /api/users?page=1&pageSize=10&keyword=test

// 后端接收（自动转换后）
req.query = {
  page: 1,        // 数字类型
  pageSize: 10,  // 数字类型
  keyword: 'test' // 字符串类型
}
```

## 路由文件配置

### 当前状态

所有路由文件已移除 `query-types` 配置，因为已在全局应用：

```javascript
// routes/users.js
// 注意：query-types 中间件已在 app.js 中全局应用，无需在此重复配置
router.use(authMiddleware);
router.use(loggerMiddleware);
```

## 高级配置（可选）

如果需要自定义配置，可以使用 `middleware/queryTypes.js`：

```javascript
// middleware/queryTypes.js
const queryTypes = require('query-types');

const queryTypesMiddleware = () => {
  // 可以在这里添加自定义逻辑
  return queryTypes.middleware();
};

module.exports = queryTypesMiddleware;
```

然后在 `app.js` 中使用：

```javascript
const queryTypesMiddleware = require('./middleware/queryTypes');
app.use(queryTypesMiddleware());
```

## 类型转换规则

`query-types` 会自动识别并转换以下类型：

1. **数字** - `?page=1` → `1` (number)
2. **布尔值** - `?active=true` → `true` (boolean)
3. **数组** - `?ids=1&ids=2` → `[1, 2]` (array)
4. **对象** - 支持嵌套对象
5. **字符串** - 其他情况保持字符串类型
6. **null** - 空字符串转换为 `null`

## 注意事项

1. **POST/PUT 请求体** - `query-types` 只处理 `req.query`，不处理 `req.body`
   - 如需处理请求体，需要额外的中间件或手动转换

2. **路由参数** - `req.params` 不会被转换，需要手动处理：
   ```javascript
   const { validateId } = require('../utils/validator');
   const id = validateId(req.params.id);
   ```

3. **安全性** - 确保验证转换后的参数，防止类型错误

## 测试示例

```javascript
// 测试不同类型的查询参数
GET /api/users?page=1&pageSize=10&isActive=true&ids=1&ids=2

// req.query 结果
{
  page: 1,           // number
  pageSize: 10,      // number
  isActive: true,    // boolean
  ids: [1, 2]        // array
}
```

## 与其他方案对比

### 方案一：全局应用（当前方案）✅
- 优点：统一管理，代码简洁
- 缺点：所有路由都会处理（通常不是问题）

### 方案二：路由级别应用
- 优点：可以针对特定路由配置
- 缺点：需要在每个路由文件中重复配置

### 方案三：手动转换
- 优点：完全控制
- 缺点：代码冗余，容易遗漏

## 总结

当前使用全局应用方案，是最佳实践：
- 所有查询参数自动类型转换
- 代码简洁，易于维护
- 符合企业级开发规范

