const Sequelize = require('sequelize');
const {db} = require('../../config.json');
const sequelize = new Sequelize(db.name,db.user,db.password,{
    dialect:'mysql',
    define:{
        timestamps:false
    }
})

module.exports = sequelize;