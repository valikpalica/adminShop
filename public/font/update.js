document.addEventListener("DOMContentLoaded", async ()=>{
    let url = window.location.href;
    let array_matches = url.match(/([0-9]+)/gi);
    let id  = array_matches[array_matches.length-1];
    getGood(id).then(data=>{
        console.log(data)
        createFormWithData(data);
    }).catch(e=>{
        console.log(e);
    })
});


getGood = (id) => new Promise((resolve,reject)=>{
    fetch('/info/getGoodById',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({id_goods:id})
    }).then(data=>{
        if(data.status === 200){
            return data.json();
        }
        else{
            reject(data);
        }
    }).then(res=>{
        resolve(res);
    }).catch(e=>{
        reject(e);
    });
});


createFormWithData = (obj) =>{
    let hidden_input = document.createElement('input');
    hidden_input.type = 'text';
    hidden_input.value = obj.id_goods;
    hidden_input.name = 'id_goods';
    hidden_input.hidden = true;
    let hidden_image = document.createElement('input');
    hidden_image.type = 'text';
    hidden_image.value = obj.imageSrc;
    hidden_image.name = 'imageSrc';
    hidden_image.hidden = true;
    let form = document.getElementById('information');
    let type_good = createDivWithInput('Тип товару',obj.type_goods,'type_goods');
    let name_good = createDivWithInput("Назва товару",obj.name_goods,'name_goods');
    let cost_good = createDivWithInput('Ціна товару',obj.cost_goods,'cost_goods');
    let imageSrc = document.createElement('input');
    imageSrc.type = 'file';
    imageSrc.setAttribute('name','photo');
    let country = createDivWithInput('Країна',obj.country,'country');
    let image = document.createElement('img');
    let div_img = document.createElement('div');
    div_img.className = 'div_img';
    image.src = `/${obj.imageSrc}`
    div_img.append(image);
    let butoon = document.createElement('button');
    butoon.textContent = 'Send';
    butoon.type = 'submit';
    form.append(type_good,name_good,cost_good,country,div_img,imageSrc,hidden_input,hidden_image,butoon);
}

createDivWithInput = (placeholder,value,name) =>{
    let div = document.createElement('div');
    div.className = 'data';
    let input = document.createElement('input');
    input.type = 'text'
    input.value = value;
    input.name = name;
    let lable = document.createElement('lable');
    lable.textContent = placeholder;
    div.append(lable,input);
    return div;
};




