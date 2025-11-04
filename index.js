'use strict';

let result = '';
let curNumber = '';
let lastAction ='';

function checkElementId (event, buttons){
    let button = '';

    if(event !== null) {
        button = event.target.id;
    } else {
        button = buttons.id;
    };

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
                changeExprString('');
                lastAction = '';
                break;
            case 'C':
                curNumber = '';
                changeOutputText ('0');
                break;
            case "DEL":
                 data = getOutputText();
                 curNumber = data.substring(0, (data.length - 1));
                 lastAction = '';
                changeOutputText (curNumber);
                break;
            case '1/X':
                data = getOutputText();
                curNumber = 1/Number(data);
                changeOutputText (curNumber);
                changeExprString('1/(' + data +') =');
                lastAction = '';
                break;
            case 'X^2':
                data = getOutputText();
                curNumber = Number(data)**2;
                changeOutputText (curNumber);
                changeExprString('X^2 = ');
                lastAction = '';
                break;
            case 'SQRT(x)':
                data = getOutputText();
                curNumber = Math.sqrt(Number(data));
                changeOutputText (curNumber);
                changeExprString('SQRT(x) = ');
                lastAction = '';
                break;
            case '÷':
                data = getOutputText();
                execData();
                result = curNumber;
                curNumber = '';
                lastAction = '÷'
                changeExprString(`${result} ${lastAction}`);
                changeOutputText('0');
                break;
            case '×':
                data = getOutputText();
                result = curNumber;
                execData();
                curNumber = '';
                lastAction = '×'
                changeExprString(`${result} ${lastAction}`);
                changeOutputText('0');
                break;
            case '-':
                data = getOutputText();
                execData();
                result = curNumber;
                curNumber = '';
                lastAction = '-'
                changeExprString(`${result} ${lastAction}`);
                changeOutputText('0');
                break;
            case '+':
                data = getOutputText();
                execData();
                result = curNumber;
                curNumber = '';
                lastAction = '+'
                changeExprString(`${result} ${lastAction}`);
                changeOutputText('0');
                break;
            case '=':
                execData();
                break;
            case '+/-':
                data = getOutputText();
                if (data != 0) {
                    curNumber = Number(data) * -1;
                    changeOutputText(curNumber);
                };
                break;
            case ',':
                data = getOutputText();
                if (data == 0) {
                    data = 0;
                };

                if(!isNaN(Number(`${Number(data)}.`))) {
                    curNumber = `${Number(data)}.`;
                    changeOutputText(curNumber);
                };
        }
    }
}

function execData() {
    let data = getOutputText();
    if (lastAction !='') {
        changeExprString(`${result} ${lastAction} ${data} =`);
    };

    switch(lastAction) {
                    case '÷':
                        curNumber = Number(result) / Number(data);
                        changeOutputText(Number(result) / Number(data));
                        break;
                    case '×':
                        curNumber = Number(result) * Number(data);
                        changeOutputText(Number(result) * Number(data));
                        break;
                    case '-':
                        curNumber = Number(result) - Number(data);
                        changeOutputText(Number(result) - Number(data));
                        break;
                    case '+':
                        curNumber = Number(result) + Number(data);
                        changeOutputText(Number(result) + Number(data));
                        break;
                };
    lastAction = '';
};

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

function changeExprString(data) {
    let div = document.getElementsByClassName('expr-string')[0];
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

document.addEventListener("keydown", function (event) {
    let button = document.getElementById("=");
    button.focus();

    let regEx = /[0-9]|\+|-|,|=/;

    if(regEx.test(event.key)) {
        let button = document.getElementById(event.key);
        checkElementId(null, button);
    } else if (event.key == '*') {
        let button = document.getElementById("×");
        checkElementId(null, button);
    } else if (event.key == '/') {
        let button = document.getElementById("÷");
        checkElementId(null, button);
    } else if (event.key == 'Enter') {
        let button = document.getElementById("=");
        checkElementId(null, button);
    } else if (event.key == '.') {
        let button = document.getElementById(",");
        checkElementId(null, button);
    }else if (event.key == 'Backspace') {
        let button = document.getElementById("DEL");
        checkElementId(null, button);
    };    
})
