const router = require('express').Router();
const controller = require('../controller/index');
const upload = require('../controller/multer');

router.get('/getAllGoods',controller.getAllGoods);
router.post('/getGoodByType',controller.getGoodByType);
router.get('/getGoodType',controller.getGoodType);
router.post('/getGoodById',controller.getGoodById);
router.post('/putGood',upload.single('photo'),controller.putGood);
router.post('/deleteGood',upload.single('photo'),controller.deleteGood);
router.post('/updateGood',controller.updateGood);
router.post('/getAllBasket',controller.getAllBasket);
router.get('/getBasketByid/:id',controller.getBasketByid);
router.post('/sendBasket',controller.sendBasket);
router.post('/deleteBasket',controller.deleteBasket);

module.exports = router;