const display = document.getElementById("display");

function append(value){
    if(display.value === "0"){
        display.value = value;
    }else{
        display.value += value;
    }
}

function calculate(){
    try{
        display.value = eval(display.value);
    }catch{
        display.value = "Error";
    }
}

function clearDisplay(){
    display.value = "0";
}