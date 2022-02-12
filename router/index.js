const router = require('express').Router();
const controller = require('../controller/index');

router.get('/getAllGoods',controller.getAllGoods);
router.post('/getGoodByType',controller.getGoodByType);
router.get('/getGoodType',controller.getGoodType);
router.post('/getGoodById',controller.getGoodById);
router.post('/putGood',controller.putGood);
router.post('/deleteGood',controller.deleteGood);
router.post('/updateGood',controller.updateGood);
router.post('/getAllBasket',controller.getAllBasket);
router.get('/getBasketByid/:id',controller.getBasketByid);
router.post('/sendBasket',controller.sendBasket);
router.post('/deleteBasket',controller.deleteBasket);

module.exports = router;