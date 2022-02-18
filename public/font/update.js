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
    let form = document.getElementById('information');
    let type_good = createDivWithInput('Тип товару',obj.type_goods);
    let name_good = createDivWithInput("Назва товару",obj.name_goods);
    let cost_good = createDivWithInput('Ціна товару',obj.cost_goods);
    let imageSrc = createDivWithInput('Посилання на картинку',obj.imageSrc);
    let country = createDivWithInput('Країна',obj.country);
    let image = document.createElement('img');
    let div_img = document.createElement('div');
    div_img.className = 'div_img';
    image.src = `/${obj.imageSrc}`
    div_img.append(image);
    let butoon = document.createElement('button');
    butoon.textContent = 'Send';
    butoon.type = 'submit';
    form.append(type_good,name_good,cost_good,country,imageSrc,div_img,butoon);
}

createDivWithInput = (placeholder,value) =>{
    let div = document.createElement('div');
    div.className = 'data';
    let input = document.createElement('input');
    input.type = 'text'
    input.value = value
    let lable = document.createElement('lable');
    lable.textContent = placeholder;
    div.append(lable,input);
    return div;
};





