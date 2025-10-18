'use strict';

let result = '';
let curNumber = '';
let lastAction ='';

function checkElementId (event){
    let button = event.target.id;
    let data = '';

    if(!isNaN(Number(button))) {
       inputNumber(button);
    } else {
        switch(button){
            case '%':
                return 'findPercent';
                break;
            case 'CE':
                result = '';
                curNumber = '';
                changeOutputText ('0');
                break;
            case 'C':
                curNumber = '';
                changeOutputText ('0');
                break;
            case "DEL":
                 data = getOutputText();
                changeOutputText (data.substring(0, (data.length - 1)));
                break;
            case '1/x':
                data = getOutputText();
                break;
            case 'x^2':
                return 'sqr'
                break;
            case 'SQRT(x)':
                return 'sqrt'
                break;
            case '÷':
                return 'devide'
                break;
        }
    }
}

function changeOutputText (data) {
    let div = document.getElementsByClassName("output-text")[0];
    div.innerHTML = data;  
}

function getOutputText () {
    let div = document.getElementsByClassName("output-text")[0];

    return div.innerHTML;
}

function inputNumber(data) {
    let outputText = getOutputText();

    if (outputText == 0 && data == 0) {
        changeOutputText ('0');
    } else {
        curNumber += String(data);
        changeOutputText (curNumber);
    }
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
