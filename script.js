const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const decimal = document.getElementById('dot');
const clearButtons = document.querySelectorAll('.clear');
const display = document.getElementById('display');
let memoryCurrentNumber = 0;
let memoryNewNumber = false;
let memoryPendingOperation = '';

numbers.forEach((e, i) => numbers[i].addEventListener('click', (e) => operandEnter(e.target.textContent)));

let operandEnter = (number) => {
  if (memoryNewNumber) {
    display.value = number;
    memoryNewNumber = false;
  } else display.value === '0' ? display.value = number : display.value += number;
  display.value = display.value.substring(0,10);
};

operations.forEach((e, i) => operations[i].addEventListener('click', (e) => operatorEnter(e.target.textContent)));

let operatorEnter = (op) => {
  let localOperationMemory = display.value;
  if (memoryNewNumber && memoryPendingOperation !== '=') display.value = memoryCurrentNumber;
    else { memoryNewNumber = true;
    if (memoryPendingOperation === '+') memoryCurrentNumber += +localOperationMemory;
      else if (memoryPendingOperation === '-') memoryCurrentNumber = (memoryCurrentNumber*Math.pow(10, 9) - (+localOperationMemory*Math.pow(10, 9)))/Math.pow(10, 9);
      else if (memoryPendingOperation === '*') memoryCurrentNumber *= +localOperationMemory;
      else if (memoryPendingOperation === '/') memoryCurrentNumber /= +localOperationMemory;
      else memoryCurrentNumber = +localOperationMemory;  
    (memoryCurrentNumber + '').length < 9 ? display.value = memoryCurrentNumber : display.value = memoryCurrentNumber.toPrecision(6);
    memoryPendingOperation = op;
  } 
};

clearButtons.forEach((e, i) => clearButtons[i].addEventListener('click', (e) => clearDisplay(e.srcElement.id)));

let clearDisplay = (id) => {
  if (id === 'ce') {
    display.value = '0';
    memoryNewNumber = true;
  } else if (id === 'c') {
    display.value = '0';
    memoryNewNumber = true;
    memoryCurrentNumber = 0;
    memoryPendingOperation = '';
  };
};

decimal.addEventListener('click', decimalPoint = () => {
  let localDecimalMemory = display.value;
  if (memoryNewNumber) {
    localDecimalMemory = '0.';
    memoryNewNumber = false;
  } else if (localDecimalMemory.indexOf('.') === -1) localDecimalMemory += '.'; 
  display.value = localDecimalMemory;
}); 
