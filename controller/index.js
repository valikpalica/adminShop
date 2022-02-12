const crud = require('../DB/crud');

class Controller{
    getAllGoods = (req,res) => {
        crud.getAllGoods().then(data=>{
            res.status(200).json(data)
        }).catch(e=>{
            console.log(e);
            res.status(400).json(e);
        })
    };
    getGoodByType = (req,res) =>{
        crud.getGoodByType(req.body).then(data=>{
            res.status(200).json(data)
        }).catch(e=>{
            console.log(e);
            res.status(400).json(e)
        })
    }
    getGoodType = (req,res) =>{
        crud.getGoodType().then(data=>{
            res.status(200).json(data);
        }).catch(e=>{
            res.status(400).json(e);
        });
    }
    getGoodById = (req,res) =>{
        crud.getGoodById(req.body).then(data=>{
            res.status(200).json(data)
        }).catch(e=>{
            console.log(e);
            res.status(400).json(e)
        });
    };
    putGood = (req,res) =>{
        crud.putGood(req.body).then(data=>{
            res.status(200).json(data)
        }).catch(e=>{
            console.log(e);
            res.status(400).json(e)
        })
    }
    deleteGood = (req,res) =>{
        crud.deleteGood(req.body).then(data=>{
            res.status(200).json(data)
        }).catch(e=>{
            console.log(e);
            res.status(400).json(e)
        })
    }
    updateGood = (req,res) =>{
        crud.updateGood(req.body).then(data=>{
            res.status(200).json(data)
        }).catch(e=>{
            console.log(e);
            res.status(400).json(e)
        })
    }
    getAllBasket = (req,res) =>{
        crud.getAllBasket(req.body).then(data=>{
            res.status(200).json(data);
        }).catch(e=>{
            console.log(e);
            res.status(400).json(e);
        })
    }
    getBasketByid = (req,res) =>{
        crud.getBasketById(req.params['id']).then(data=>{
            res.status(200).json(data);
        }).catch(e=>{
            console.log(e);
            res.status(400).json(e);
        });
    }
    sendBasket = (req,res) =>{
        crud.sendBasket(req.body).then(data=>{
            res.status(200).json(data);
        }).catch(e=>{
            res.status(400).json(e);
        });
    }
    deleteBasket = (req,res) =>{
        crud.deleteBasket(req.body).then(data=>{
            res.status(200).json(data)
        }).catch(e=>{
            res.status(400).json(e);
        })
    }
};

module.exports = new Controller();
