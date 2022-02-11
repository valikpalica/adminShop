const router = require('express').Router();


router.get('/main',(req,res)=>{
    res.render('main.hbs');
});
router.get('/good',(req,res)=>{
    res.render('good.hbs')
});
router.get('/basket',(req,res)=>{
    res.render('basket.hbs');
});

module.exports = router;