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
    }).then(data=>{
        return data.json();
    }).then(result=>{
        console.log(result.data);
        create_table(result.data);
    }).catch(e=>{
        console.log(e);
    })
});

create_table = (array) =>{
    let div = document.getElementById('tables_div');
    let table = document.createElement('table');
    table.className = 'table';
    array.forEach(item=>{
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.textContent = `${item.type_goods} ${item.name_goods} ${item.cost_goods} ${item.country} ${item.discont?item.discont:''}`
        tr.appendChild(td);
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
