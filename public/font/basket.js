document.getElementById('find_basket').addEventListener("click",()=>{
    getBasket().then(data=>{
        create_table(data);
    }).catch(e=>{
        message_error(e);
        console.log(e);
    })
});
getBasket = () => new Promise((resolve,reject)=>{
    fetch('/info/getAllBasket',{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({status:document.getElementById('type_basket').value === "1" ? false : true})
    }).then(async (data) =>{
        if(data.status === 200){
            let res = await data.json()
            resolve(res);
        }
        else{
            throw new Error(await data.json());
        }
    }).catch(e=>{
        reject(e);
    }); 
});
create_table = (array) =>{
    console.log(array);
    let div = document.getElementById('table_basket');
    let table = document.createElement('table');
    table.className = 'table';
    array.forEach(item=>{
        let tr = document.createElement('tr');
        let td_location = document.createElement('td');
        td_location.textContent = item.location;
        let td_name_customer = document.createElement('td');
        td_name_customer.textContent = item.name_customer;
        let td_phone_number = document.createElement('td');
        td_phone_number.textContent = item.phone_number
        let a_information = document.createElement('a');
        let button_delete = document.createElement('button');
        a_information.href = `/view/basketinfo/${item.id_customer}`;
        a_information.title = 'Information'
        a_information.textContent = 'Information';
        button_delete.textContent = 'Delte';
        button_delete.addEventListener('click',()=>{
            delete_basket(item.id_customer).then(data=>{
                console.log(data);
            }).then(()=>{
                getBasket().then(data=>{
                    create_table(data);
                }).catch(e=>{
                    message_error(e);
                    console.log(e);
                })
            }).catch(e=>{console.log(e)})
        })
        tr.append(td_location,td_name_customer,td_phone_number,a_information,button_delete);
        table.append(tr);
    })
    div.replaceChild(table,div.childNodes[0]);
}
message_error = (e) =>{
    let div = document.getElementById('table_basket');
    div.textContent = e;
} 
delete_basket = (id) => new Promise((resolve,reject)=>{
    fetch('/info/deleteBasket',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({customer_id:id})
    }).then(data=>{
        resolve(data);
    }).catch(e=>{
        reject(e)
    })
});