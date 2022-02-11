const sequlize = require('../sequelize/connection');
const Sequelize = require('sequelize');

const customer = sequlize.define('customer',{
    id_customer:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    name_customer:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    surname_customer:{
        type:Sequelize.STRING,
        allowNull:false
    },
    patronime_customer:{
        type:Sequelize.STRING,
        allowNull:false
    },
    phone_number:{
        type:Sequelize.STRING,
        allowNull:false
    },
    location:{
        type:Sequelize.STRING,
        allowNull:false
    },
    status:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false,
    }
});

module.exports = customer; 