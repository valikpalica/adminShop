const Basket = require('../modal/basket');
const Customer = require('../modal/customer');
const Goods = require('../modal/goods');
const fs = require('fs');
const path = require('path');

class CRUD {
    getAllGoods = () => new Promise((resolve,reject)=>{
        Goods.findAll({raw:false}).then(data=>{
            if(data.length>0){
                resolve(data);
            }
            else{
                reject('array equal null');
            }
        }).catch(e=>{
            reject(e)
        });
    });
    getGoodByType = ({type_goods}) => new Promise((resolve,reject)=>{
        Goods.findAll({raw:false,where:{type_goods}}).then(data=>{
            if(data.length>0){
                resolve(data);
            }
            else{
                reject('array equal null');
            }
        }).catch(e=>{
            reject(e)
        })
    });
    getGoodById = ({id_goods}) => new Promise((resolve,reject)=>{
        Goods.findByPk(id_goods).then(data=>{
            if(data) resolve(data)
            else reject('good not found');
        }).catch(e=>{
            reject(e)
        })
    });
    putGood = ({type_goods,name_goods,cost_goods,country},imageSrc) => new Promise((resolve,reject)=>{
        Goods.create({type_goods,
                name_goods,
                cost_goods,
                country,
                imageSrc
            }).then(data=>{
                if(data) resolve(data)
                else reject(false)
        }).catch(e=>{
            reject(e)
        })
    });
    deleteGood = ({id_goods,imageSrc}) => new Promise((resolve,reject)=>{
        if(imageSrc!==null){
            try {
                fs.unlinkSync(path.join(path.resolve(__dirname,'../..'),'photo',imageSrc));
            } catch (error) {
                console.error(error);
            }
        }
        Goods.destroy({where:{id_goods}}).then(data=>{
            console.log(data);
            if(data) resolve(data);
            else reject(false);
        }).catch(e=>{
            reject(e);
        })
    });
    updateGood = (body,file) => new Promise((resolve,reject)=>{
        let {type_goods,name_goods,cost_goods,id_goods,country,imageSrc:old_image} = body;
        let new_image = old_image;
        console.log(old_image);
        if(file){
            try {
                if(old_image.length>0){
                    fs.unlinkSync(path.join(path.resolve(__dirname,'../..'),'photo',old_image));
                }
                new_image = file.originalname;
            } catch (error) {
                console.error(error);
            }
        }
        console.log(new_image);
        Goods.findByPk(id_goods).then(async (data)=>{
            try {
                data.set({
                    type_goods,
                    name_goods,
                    cost_goods,
                    country,
                    imageSrc:new_image
                });
                let res = await data.save();
                console.log(res);
                if(res) resolve(res);
            } catch (error) {
                throw new Error(error);
            }
        }).catch(e=>{
            reject(e);
        });
    });
    getAllBasket = ({status}) => new Promise((resolve,reject)=>{
        Customer.findAll({raw:false,
            attributes:['id_customer','location','phone_number','name_customer'],
            where:{
                status
            }
    }).then(data=>{
            if(data.length>0) resolve(data);
            else reject('array basket equal null');
        }).catch(e=>{
            reject(e)
        });
    });
    getBasketById = (customer_id) => new Promise((resolve,reject)=>{
        Customer.findAll({raw:false,where:{
                id_customer:customer_id
            },include:[{
                model:Basket,
                include:{
                    model:Goods,
                }
            }]
        }).then((data)=>{
            if(data.length>0){
                let sum = 0;
                data[0].baskets.map(item=>{
                    item.dataValues['sum_good'] = Math.round((item.count_goods * item.good.cost_goods)*1000)/1000;
                    sum+=item.dataValues['sum_good'];
                });
                // console.log(sum);
                // console.log(Math.round(sum*1000)/1000)
                data[0].dataValues['all_sum'] = Math.round(sum*1000)/1000;
                resolve(data[0]);
            }
            else{
                reject('not baskets');
            }
        }).catch(e=>{
            reject(e);
        })
    });
    sendBasket = ({customer_id}) => new Promise((resolve,reject)=>{
        Customer.update({status:true},{where:{id_customer:customer_id}}).then(data=>resolve(data)).catch(e=>reject(e));
    });
    deleteBasket = ({customer_id}) => new Promise((resolve,reject)=>{
        Customer.destroy({where:{id_customer:customer_id}}).then(data=>{
            resolve(data);
        }).catch(e=>{
            reject(e);
        })
    });
    

    getGoodType = () => new Promise((resolve,reject)=>{
        Goods.findAll({raw:true,
            attributes:['type_goods'],
            group:['type_goods']
        }).then(data=>{
            if(data.length>0){
                resolve(data);
            }
            else{
                reject('haven`t goods');
            }
        }).catch(e=>{
            reject(`class Good method getAllGoods error ${e}`)
        })
    })
    Setorder = ({customer_info,packages}) => new Promise((resolve,reject)=>{
        let {name_customer,surname_customer,patronime_customer,phone_number,location} = customer_info;
        Customer.create({
            name_customer,
            surname_customer,
            patronime_customer,
            phone_number,
            location
        }).then(data=>{
            return data.id_customer
        }).then((customer_id)=>{
            if(packages.length>0){
                let index = 0;
                for(let i = 0;i<packages.length;i++){
                    Basket.create({
                        goods_id:packages[i].goods_id,
                        count_goods:packages[i].count_goods,
                        customer_id
                    }).then(data=>{
                        index++;
                        if(index===packages.length) resolve({customer_id});
                    }).catch(e=>{
                        Customer.destroy({where:{
                            id_customer:customer_id
                        }}).catch(e=>{
                            reject(`Goods class method setorder destroy Customer error ${e}`);
                        });
                        reject(`Goods class method setorder create Basket error ${e}`);
                    })
                }
            }
            else{
                Customer.destroy({where:{
                    id_customer:customer_id
                }}).then(data=>{
                    reject('packages length equal 0');
                }).catch(e=>{
                    reject(`Goods class method setorder destroy Customer error ${e}`);
                });
            }
        }).catch(e=>{
            reject(`Goods class method setorder create Customer  error ${e}`);
        })
    });
}

module.exports = new CRUD();