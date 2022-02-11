


document.getElementById('find_basket').addEventListener("click",()=>{
    fetch('/info/getAllBasket',{
        method:"POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({status:document.getElementById('type_basket').value === "1" ? false : true})
    }).then(async (data) =>{
        console.log(data);
        if(data.status === 200){
            create_table(await data.json());
        }
        else{
            throw new Error(await data.json());
        }
    }).catch(e=>{
        console.error(e);
        document.getElementById('table_basket').innerHTML = e;
    }); 
});

create_table = (array) =>{
    let div = document.getElementById('table_basket');
    let table = document.createElement('table');
    table.className = 'table';
    array.forEach(item=>{
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.textContent = `${item.location} ${item.name_customer} ${item.phone_number}`
        tr.appendChild(td);
        table.append(tr);
    })
    div.replaceChild(table,div.childNodes[0]);
}