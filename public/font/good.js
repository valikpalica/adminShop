document.addEventListener("DOMContentLoaded", async ()=>{
    getType().then(data=>{
        create_selector(data);
    }).catch(e=>{
        console.log(e);
        message_error(e);
    })
});
getType = () =>new Promise((resolve,reject)=>{
    fetch('/info/getGoodType').then(data=>{
        return data.json();
    }).then(result=>{
        if(typeof result === 'object'){
           resolve(result);
        }
        else{
            throw new Error(result);
        }
    }).catch(e=>{
        reject(e);
    })
});
document.getElementById('find').addEventListener('click',()=>{
    let type_good  = document.getElementById('selector_type_good').value;
    getGoods(type_good).then(data=>{
        create_table(data);
    }).catch(e=>{
        message_error(e);
        let div = document.getElementById('type_good');
        div.removeChild(div.childNodes[0]);
        console.log(e);
    });
});
getGoods = (type_good) => new Promise((resolve,reject)=>{
    if(type_good){
        fetch('/info/getGoodByType',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({type_goods:type_good})
        }).then(async (data)=>{
            if(data.status === 200){
                let res = await data.json();
                resolve(res)
            }
            else{
                throw new Error('no goods');
            }
        }).catch(e=>{
            reject(e);
        })
    }
});
create_table = (array) =>{
    let div = document.getElementById('tables_div');
    let table = document.createElement('table');
    table.className = 'table';
    array.forEach(item=>{
        let tr = document.createElement('tr');
        let td_type_good = document.createElement('td');
        td_type_good.textContent = item.type_goods;
        let td_name_good = document.createElement('td');
        td_name_good.textContent = item.name_goods;
        let td_cost_good = document.createElement('td');
        td_cost_good.textContent = item.cost_goods;
        let td_country = document.createElement('td');
        td_country.textContent = item.country;
        let img = document.createElement('img');
        img.src = `/${item.imageSrc}`;
        let button_delete = document.createElement('button');
        button_delete.textContent = 'Delete';
        button_delete.addEventListener('click',()=>{
            delete_good(item);
        });
        let link_for_update_good = document.createElement('a');
        link_for_update_good.textContent = 'Update';
        link_for_update_good.href = `/view/update/${item.id_goods}`;
        tr.append(td_type_good,td_name_good,td_cost_good,td_country,img,button_delete,link_for_update_good);
        table.append(tr);
    })
    div.replaceChild(table,div.childNodes[0]);
};
create_selector = (array) =>{
    let div = document.getElementById('type_good');
    let selector = document.createElement('select');
    selector.id = 'selector_type_good'
    selector.name = 'type_goods';
    selector.className = 'browser-default';
    array.forEach(element => {
        let option = document.createElement('option');
        option.value = element.type_goods;
        option.textContent = element.type_goods;
        selector.appendChild(option);
    });
    div.replaceChild(selector,div.childNodes[0]);
}
message_error = (e) =>{
    let div = document.getElementById('tables_div');
    div.textContent = e;
}
delete_good = (item) =>{
    let {id_goods,imageSrc} = item;
    let type_goods  = document.getElementById('selector_type_good').value;
    fetch('/info/deleteGood',{method:'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({id_goods,imageSrc})
    }).then(data=>{
        if(data.status === 200){
                getGoods(type_goods).then(data=>{
                    if(data.length>0){
                        create_table(data);
                    }
                    else{
                        throw new Error('array equal null');
                    }
                }).catch(e=>{
                    message_error(e);
                    getType().then(data=>{
                        create_selector(data);
                    }).catch(e=>{
                        console.log(e);
                        let div = document.getElementById('type_good');
                        div.removeChild(div.childNodes[0]);
                        message_error(e);
                    })
                    console.log(e);
                })
        }
    }).catch(e=>{
        console.log(e);
    })
}