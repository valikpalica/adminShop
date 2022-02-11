const Goods = require('../modal/goods');
const Customer = require('../modal/customer');
const Basket = require('../modal/basket');


Goods.hasMany(Basket,{foreignKey:'goods_id',onDelete:'cascade'});
Customer.hasMany(Basket,{foreignKey:'customer_id',onDelete:'cascade'});
Basket.belongsTo(Goods,{foreignKey:'goods_id'});
Basket.belongsTo(Customer,{foreignKey:'customer_id'});