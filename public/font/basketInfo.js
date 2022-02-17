document.addEventListener("DOMContentLoaded", async ()=>{
    let customer_id  = document.getElementById('customer_id').value;
    fetch(`/info/getBasketByid/${customer_id}`).then((data)=>{
        if(data.status === 200){
            return data.json();
        }
        else{
            throw new Error(data);
        }
    }).then(result=>{
        create_table_info(result);
    }).catch(e=>{
        console.log(e);
    }) 
});

create_table_info = (obj) =>{
    let div = document.getElementById('basketInfo');
    let table = document.createElement('table');
    let ul = document.createElement('ul');
    let lablel_person = create_label('Замовник',`${obj['surname_customer']} ${obj['name_customer']} ${obj['patronime_customer']}`);
    let phone = create_label('Телефоний номер',obj['phone_number']);
    let location = create_label('Місце знаходження',obj['location']);
    let status = create_label('Статус відправлення',obj['status']);
    let sum = create_label('Загальна сума замовлення у гривнях',obj['all_sum']);
    ul.append(lablel_person,phone,location,status,sum)
    div.append(ul);
    let trh = document.createElement('tr');
    let th_type =  document.createElement('th');
    th_type.textContent = "Тип товару"
    let th_name =  document.createElement('th');
    th_name.textContent = "Ім'я"
    let th_cost =  document.createElement('th');
    th_cost.textContent = "Ціна"
    let th_count =  document.createElement('th');
    th_count.textContent = "Кількість"
    let th_sum =  document.createElement('th');
    th_sum.textContent = "Загальна сума"
    trh.append(th_type,th_name,th_cost,th_count,th_sum)
    table.append(trh);

    obj['baskets'].forEach(element => {
        let tr = document.createElement('tr');
        let type_goods = document.createElement('td');
        type_goods.textContent = element.good.type_goods;
        let name_goods = document.createElement('td');
        name_goods.textContent = element.good.name_goods;
        let cost_goods = document.createElement('td');
        cost_goods.textContent = element.good.cost_goods;
        let count_goods = document.createElement('td');
        count_goods.textContent = element.count_goods;
        let sum_good = document.createElement('td');
        sum_good.textContent = element.sum_good;
        tr.append(type_goods,name_goods,cost_goods,count_goods,sum_good);
        table.appendChild(tr);
    });
    div.appendChild(table);
};

create_label = (text,value)=>{
    let lable = document.createElement('li');
    lable.textContent = `${text}:${value}`;
    return lable;
}