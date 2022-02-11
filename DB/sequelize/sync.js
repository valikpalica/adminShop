const sequelize = require('./connection');

const startDB = () => new Promise((resolve,reject)=>{
    try {
        require('./association');
    } catch (error) {
        reject(`Error with association DB ${error}`);
    }
    sequelize.sync({/*force:true*/}).then(res=>{
        resolve(true);
    }).catch(e=>{
        reject(`Error with connection DB ${e}`)
    });
});

module.exports = startDB;