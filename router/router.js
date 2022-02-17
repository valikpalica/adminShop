const router = require('express').Router();
const controller = require('../controller/index');

router.get('/getAllGoods',controller.getGoodType);
router.post('/getGoodsByType',controller.getGoodByType);
router.post('/setOrder',controller.Setorder);
router.post('/getGoodById',controller.getGoodById);

module.exports = router;