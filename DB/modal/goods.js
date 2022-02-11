const sequlize = require('../sequelize/connection');
const Sequelize = require('sequelize');

const Goods = sequlize.define('goods',{
    id_goods:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    type_goods:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    name_goods:{
        type:Sequelize.STRING,
        allowNull:false
    },
    cost_goods:{
        type:Sequelize.DOUBLE,
        allowNull:false
    },
    country:{
        type:Sequelize.STRING,
        allowNull:false
    },
    disconts:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    imageSrc:{
        type:Sequelize.STRING,
        allowNull:true,
    }
});

module.exports = Goods