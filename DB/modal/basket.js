const sequelize = require('../sequelize/connection');
const Sequelize = require('sequelize');

const basket = sequelize.define('basket',{
    id_basket:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    count_goods:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
});

module.exports = basket;