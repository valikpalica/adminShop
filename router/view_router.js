const router = require('express').Router();
const crud = require('../DB/crud/index')


router.get('/main',(req,res)=>{
    res.render('main.hbs');
});
router.get('/good',(req,res)=>{
    res.render('good.hbs')
});
router.get('/basket',(req,res)=>{
    res.render('basket.hbs');
});
router.get('/basketinfo/:id',(req,res)=>{
    res.render('basketInfo.hbs',{data:req.params['id']});
});
router.get('/appendGood',(req,res)=>{
    res.render('appendGood.hbs');
})
router.get('/update/:id',(req,res)=>{
    res.render('update.hbs',{data:req.params['id']});
});

module.exports = router;