const express = require('express');
const app = express();
const startDB = require('./DB/sequelize/sync');
const {app_config} = require('./config.json');
const path = require('path');
const info = require('./router/index');
const view = require('./router/view_router');
const user = require('./router/router');
const hbs = require("hbs");

process.on('SIGTERM',()=>{
    app.close(()=>{
        console.log('server has been terminated');
    });
});

try {
    app.set('view engine','hbs');
    hbs.registerPartials(path.join(__dirname,"views/partials"));
    app.use(express.static(path.join(__dirname,'public')));
    app.use(express.static(path.join(__dirname,'photo')));
    app.use(express.json()); 
    app.use(express.urlencoded({extended:false}));
    app.use('/info',info);
    app.use('/view',view);
    app.use('/user',user);
    app.listen(app_config.PORT,()=>{
        startDB().then(data=>{
            console.log(`server has been started on PORT: ${app_config.PORT} and status ${data}`);
        }).catch(e=>{
            
            throw new Error(`Error with connection DB ${e}`)
        })
    });
} catch (error) {
    process.kill(process.pid, 'SIGTERM')
}