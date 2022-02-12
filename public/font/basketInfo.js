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
    for (const key in obj) {
        console.log(`key ${key} value ${obj[key]}`);
    }
};