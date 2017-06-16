var create = require('./cat'); //NodeJS会根据cat包目录下的package.json找到入口模块所在位置。
var cart = create.createPerson('cart');
console.log(cart);