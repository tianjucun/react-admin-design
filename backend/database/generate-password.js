/**
 * 生成密码哈希工具
 * 用法: node generate-password.js [password]
 */

const bcrypt = require('bcryptjs');

const password = process.argv[2] || 'admin123';
const hash = bcrypt.hashSync(password, 10);

console.log('========================================');
console.log('密码哈希生成工具');
console.log('========================================');
console.log('原始密码:', password);
console.log('哈希值:', hash);
console.log('========================================');
console.log('SQL 更新语句:');
console.log(`UPDATE users SET password = '${hash}' WHERE username = 'admin';`);
console.log('========================================');
