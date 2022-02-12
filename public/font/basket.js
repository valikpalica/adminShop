
document.getElementById('find_basket').addEventListener("click",()=>{
    fetch('/info/getAllBasket',{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({status:document.getElementById('type_basket').value === "1" ? false : true})
    }).then(async (data) =>{
        if(data.status === 200){
            create_table(await data.json());
        }
        else{
            throw new Error(await data.json());
        }
    }).catch(e=>{
        console.error(e);
        document.getElementById('table_basket').innerText = e;
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
            delete_basket(item.id_customer)
        })
        tr.appendChild(td_location);
        tr.appendChild(td_name_customer);
        tr.appendChild(td_phone_number);
        tr.appendChild(a_information);
        tr.append(button_delete);
        table.append(tr);
    })
    div.replaceChild(table,div.childNodes[0]);
}

delete_basket = (id) =>{
    console.log(id);
};

