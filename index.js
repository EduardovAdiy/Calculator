'use strict';

let result = '';
let lastAction ='';

function checkElementId (event){
    let button = event.target.id;

    if(!isNaN(Number(button))) {
        if (button > 0) {
            result += String(button);
            changeOutputText(result); 
        }
    }
}

function changeOutputText (data) {
    let div = document.getElementsByClassName("output-text")[0];
    console.log(data, div)
    div.innerHTML = data;
    
}

function generateButtons() {
    let buttons = ['%', 'CE', 'C','DEL', 
        '1/X','X^2','SQRT(x)', '÷',
        '7', '8', '9', '×',
        '4', '5', '6', '-',
        '1', '2', '3', '+',
        '+/-', '0', ',', '='
    ];

    let div = document.getElementsByClassName("main-block")[0];

    for(let elem of buttons) {
        let button = document.createElement('button');
        button.id = elem;
        button.innerHTML = elem;
        button.addEventListener("click", checkElementId);

        div.appendChild(button);
    }
}

generateButtons();