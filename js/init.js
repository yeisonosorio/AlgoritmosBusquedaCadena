function moveElement(id, data) {
    id.childNodes.forEach(function (item, index) {
        item.style.left= (item.offsetWidth-2) * (data.index + index) +'px';
        if(!data.found){    
            if(data.matchArr.includes(index)) {
                item.style.backgroundColor= "blue"
            }
            else{
                item.style.backgroundColor= defColor;
            }
        }
        else{
            item.style.backgroundColor="green";
        }
    })
}

function removeChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function createDiv(parent,letter,index,ancho,top){

    let div=document.createElement("div");
    div.setAttribute("class", "letter");
    div.innerHTML = letter;
   
    div.style.width = ancho + "px";
    div.style.height = ancho + "px";
    
    div.style.position="absolute";
    div.style.left=(ancho-2)*index+"px";
    div.style.top=top+"px";
    
    div.style.backgroundColor = defColor;
    div.style.border="1px solid black";
    div.style.textAlign="center";
    div.style.fontSize=ancho/2+"px";
    div.style.lineHeight=div.style.height;

    parent.appendChild(div);
    parent.style.height=2*ancho+"px";  
}

//FUERZA BRUTA

function fuerzaBruta(base,target){
    array=[];
    
    for(let i = 0; i <= base.length-target.length; i++) {
        let match = [];
        for(let j = 0; j < target.length; j++) {
            if (target[j] === base[i + j]) {
                match.push(j);
            } 
            else break;
        }
        var actual = {
            index: i,
            matchArr: match,
            found: (match.length===target.length),
        };
        array.push(actual);
    }
    return array;
}

//KMP

function funcKMP(target) {
    var pmtArr = [];
    let pmt = target;

    for(let j = 0; j < target.length; j++) {
        let pmtNum = 0;
        for (let k = 0; k < j; k++) {
            let head = pmt.slice(0, k + 1);
            let foot = pmt.slice(j - k, j + 1);
            if (head===foot && head.length > pmtNum) {
                pmtNum = head.length;
            }
        }
        pmtArr.push(j + 1 - pmtNum);
    }

    return pmtArr;
}

function kmpAlgorithm(base,target){
    var array=[];
    var pmt = funcKMP(target);

    for(let i = 0; i <= base.length-target.length; i++) {
        let match = [];
        let tempIndex = 0;
        for(let j = 0; j < target.length; j++) {
            if (target[j]===base[i+j]) {
                match.push(j);
            } 
            else {
                if(j){
                    var skip = pmt[j - 1];
                    tempIndex = i + skip - 1;
                }
                break;
            }
        }
        var data = {
            index: i,
            matchArr: match,
            found: (match.length===target.length),
        };

        array.push(data);
        if(tempIndex) i = tempIndex;
    }

    return array;
}

// BoyerMoore

function BoyerMooreF(base,target){
    let m = target.length;
    let n = base.length;
    let array=[];
    let s = 0;  

    let badchar = []

    //Preprocesamiento
    for (let i = 0; i < 256; i++) badchar.push(-1);
    for (i = 0; i < target.length; i++) badchar[target[i].charCodeAt(0)] = i;
    //Fin

    while(s <= (n - m)){
        let j = m-1;
        let match=[]
  
        while(j >= 0 && target[j] == base[s+j]) {
            match.push(j);
            j--;
        }

        var data={
            index: s,
            matchArr: match,
            found: (match.length===target.length),
        };

        array.push(data);
  
        if (j < 0){
            s += (s+m < n)? m-badchar[base[s+m].charCodeAt(0)] : 1;
        }
  
        else{
            s += Math.max(1, j - badchar[base[s+j].charCodeAt(0)]);
        }
    }
    
    return array;
}

//BoyerMooreHorse

function BoyerMooreHorspoolF(base,target) {
    let array=[];

    let diccionario = [];

    //Preprocesamiento
    for (let i = 0; i < 256; i++) diccionario.push(target.length);
    for (let i = 0; i < target.length; i++) diccionario[target.charCodeAt(i)] = (target.length - i) - 1;
    //Fin

    for (let i = target.length-1; i < base.length; i++) {
        let idx= base.charCodeAt(i);

        if(idx>255) idx=idx%2+1;

        aux=i;
        i += diccionario[idx];

        if (i >= base.length) break;
        
        let x = 0;
        let resta1 = i - x;
        let resta2 = (target.length - x) - 1;

        let match=[];

        while (x < target.length && base.charAt(resta1) == target.charAt(resta2)) {
            match.push(resta2);
            x++;
            resta1 = i - x;
            resta2 = (target.length - x) - 1;
        }

        var data={
            index: i-target.length+1,
            matchArr: match,
            found: (match.length===target.length),
        };

        array.push(data);
    }

    return array;
}

//RabinKarp

function RabinKarpF(base,target){
    d = 256;
    N = base.length;
    M = target.length;
    p = 0;
    t = 0;
    q = 101;
    i=j=0;
    
    let array=[];

    //Preprocesamiento
    h = (d**(M-1))%q;
    for(i=0;i<M;i++){
        p = (d*p + target[i].charCodeAt(0))%q;
        t = (d*t + base[i].charCodeAt(0))%q;
    }
    //Fin
    
    for(i=0;i<N-M+1;i++){
        if(p==t){
            let match=[];
            // Check for characters one by one
            for(j=0;j<M;j++){
                if(base[i+j] == target[j]){
                    match.push(j);
                }
                else break;
            }
 
            var data={
                index: i,
                matchArr: match,
                found: (match.length===target.length),
            };

            array.push(data)
        }
 
        // Calculamos el valor de la tabla hast
        // Leemos el digito y lo agregamos al final
        if(i < N-M){
            t = (d*(t-base[i].charCodeAt(0)*h) + base[i+M].charCodeAt(0))%q
            if (t < 0) t = t+q
        }
    }

    return array;
}            

var defColor="#dcdcd1"; //color por defecto
var IDSTime=[];
var typed6;

let button=document.getElementById("search");
let cadena=document.getElementById("Input1");
let patron=document.getElementById("Input2");

button.addEventListener("click", function() {
    //cadenas de texto
    let cadStr=cadena.value.toUpperCase();
    let patStr=patron.value.toUpperCase();

    //grupos de letras
    var baseStr=document.getElementById("baseStr");
    var targetStr=document.getElementById("targetStr");

    var select=document.getElementById("Select1");

    var spanModal=document.getElementById("algoritmoActual")
    var enlaceModal=document.getElementById("enlaceAlgoritmo")

    
    if(select.value!="0"){
        IDSTime.forEach(function(value){
            clearTimeout(value);
        });
        IDSTime=[];
        if(cadStr.length>=patStr.length){
            removeChildren(baseStr);
            removeChildren(targetStr);
            
            let ancho=Math.trunc(baseStr.offsetWidth/cadStr.length);
            
            [...cadStr].forEach(function(value,index){
                createDiv(baseStr,value,index,ancho,0);
            });
            [...patStr].forEach(function(value,index){
                createDiv(targetStr,value,index,ancho,ancho+10);
            })
            
            //algoritmos el cual queremos seleccionar
            let indexx=[];
            let selectString;

            if(typeof(typed6)=='object') {typed6.destroy();}

            if(select.value=="1"){
                indexx=fuerzaBruta(cadStr,patStr);
                selectString=fuerzabruta;
                spanModal.innerHTML="Fuerza Bruta: "
                enlaceModal.setAttribute("href","https://drive.google.com/file/d/19Y3DnQ00zWtf0nHW4t25dg6_HvpRy-iH/view?usp=sharing")
            }
            else if(select.value=="2"){
                indexx=kmpAlgorithm(cadStr,patStr);
                selectString=kmp;
                spanModal.innerHTML="KMP: "
                enlaceModal.setAttribute("href","https://drive.google.com/file/d/1KzNuTRzcBcrhKSQJsZwLktxeJWceTup5/view?usp=sharing")
            }
            else if(select.value=="3"){
                indexx=BoyerMooreF(cadStr,patStr);
                selectString=BoyerMoore;
                spanModal.innerHTML="BoyerMore: "
                enlaceModal.setAttribute("href","https://drive.google.com/file/d/1mXImnzAfqXwJX32sBrbd9XMNjnUujqSh/view?usp=sharing")
            }
            else if(select.value=="4"){
                indexx=BoyerMooreHorspoolF(cadStr,patStr);
                selectString=BoyerMooreHorspool;
                spanModal.innerHTML="BoyerMoreHorse: "
                enlaceModal.setAttribute("href","https://drive.google.com/file/d/1btmDXxflgVAFm8kEClVduTxe41CPeKbL/view?usp=sharing")
                
            }
            else if(select.value=="5"){
                indexx=RabinKarpF(cadStr,patStr);
                selectString=RabinKarp;
                spanModal.innerHTML="RabinKarp: "
                enlaceModal.setAttribute("href","https://drive.google.com/file/d/1JHOYr--Vn-kR080j9ZxwKSTLlup4f2vu/view?usp=sharing")   
            }

            typed6 = new Typed(info, {
                strings: [selectString],
                typeSpeed: 30,
                backSpeed: 10,
                loop: false,                
            });

            indexx.forEach(function(item, index) {
                IDSTime.push(setTimeout(function(id,it) {
                    moveElement(id,it);
                },index * 1000,targetStr,item));
            });
        }
        else{
            alert("La cadena debe ser mas larga que el patron");
            cadena.value="";
            patron.value="";
        }
    }
    else{
        alert("Debes elegir una opcion de busqueda");
    }
});

