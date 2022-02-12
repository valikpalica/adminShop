document.addEventListener("DOMContentLoaded", async ()=>{
    fetch('/info/getGoodType').then(data=>{
        return data.json();
    }).then(result=>{
        console.log(result);
        create_selector(result);
    }).catch(e=>{
        console.error(e);
    })
});


document.getElementById('find').addEventListener('click',()=>{
    let type_good  = document.getElementById('selector_type_good').value;
    fetch('/info/getGoodByType',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({type_goods:type_good})
    }).then(async (data)=>{
        if(data.status = 200){
            create_table(await data.json());
        }
        else{
            throw new Error(data.json());
        }
    }).catch(e=>{
        console.log(e);
        document.getElementById('tables_div').innerText = e;
    })
});

create_table = (array) =>{
    let div = document.getElementById('tables_div');
    let table = document.createElement('table');
    table.className = 'table';
    array.forEach(item=>{
        console.log(item)
        let tr = document.createElement('tr');
        let td_type_good = document.createElement('td');
        td_type_good.textContent = item.type_goods;
        let td_name_good = document.createElement('td');
        td_name_good.textContent = item.name_goods;
        let td_cost_good = document.createElement('td');
        td_cost_good.textContent = item.cost_goods;
        let td_country = document.createElement('td');
        td_country.textContent = item.country;
        let td_discont = document.createElement('td');
        td_discont.textContent = item.discont?item.discont:''
        tr.appendChild(td_type_good);
        tr.appendChild(td_name_good);
        tr.appendChild(td_cost_good);
        tr.appendChild(td_country);
        tr.appendChild(td_discont);
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
    div.appendChild(selector);
}
