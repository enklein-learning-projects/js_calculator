let runningTotal = 0;
let buffer = '0';
let previousOperator = null;
let hasMath = false;
const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        // this is not a number
        handleSymbol(value);
    } else {
        // this is a number
        if (hasMath) {
            buffer = '0';
            hasMath = false;
        }
        handleNumber(value);
    }
    // screen.innerText = buffer;
}

function handleNumber(numberString) {
    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            hasMath = false;
            screen.innerText = runningTotal;
            break;
        case '=':
            if (previousOperator === null) {
                // need two numbers to do math
                hasMath = true;
                return;
            }
            flushOperation(parseInt(buffer));
            previousOperator = null;
            buffer = runningTotal.toString();
            runningTotal = 0;
            hasMath = true;
            screen.innerText = buffer;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            screen.innerText = buffer;
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol);
            screen.innerText = runningTotal;
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        // do nothing
        return;
    }

    const intBuffer = parseInt(buffer);

    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    previousOperator = symbol;

    buffer = '0';
}

function flushOperation(intBuffer) {
    if (previousOperator === '+') {
        runningTotal += intBuffer;
    } else if (previousOperator === '-') {
        runningTotal -= intBuffer;
    } else if (previousOperator === '×') {
        runningTotal *= intBuffer;
    } else if (previousOperator === '÷') {
        runningTotal /= intBuffer;
    }
}

function init() {
    document.querySelector('.calc-buttons')
        .addEventListener('click', function (event) {
            if (event.target.tagName !== "BUTTON") {
                return;
            }
            buttonClick(event.target.innerText);
        })
}

init();