const numbers = document.querySelectorAll('.button');
const operations = document.querySelectorAll('.button_operation');
const decimal = document.getElementById('dot');
const clearButtons = document.querySelectorAll('.button_clear');
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
  const maxDigits = 10;
  const limitDigits = 6;
  if (memoryNewNumber && memoryPendingOperation !== '=') display.value = memoryCurrentNumber;
    else { 
      memoryNewNumber = true;
    switch (memoryPendingOperation) {
      case '+':
        memoryCurrentNumber += +localOperationMemory;
        break;
      case '-':
        memoryCurrentNumber = (memoryCurrentNumber * Math.pow(10, 9) - (+localOperationMemory * Math.pow(10, 9))) / Math.pow(10, 9);
        break;
      case '*':
        memoryCurrentNumber *= +localOperationMemory;
        break;
      case '/':
        memoryCurrentNumber /= +localOperationMemory;
        break;
      default:
        memoryCurrentNumber = +localOperationMemory;
    }
    display.value = `${memoryCurrentNumber}`.length < maxDigits ? memoryCurrentNumber : memoryCurrentNumber.toPrecision(limitDigits);
    memoryPendingOperation = op;
  } 
};

clearButtons.forEach((e, i) => clearButtons[i].addEventListener('click', (e) => clearDisplay(e.srcElement.id)));

let clearDisplay = (id) => {
  const clear = 'c';
    display.value = '0';
    memoryNewNumber = true;
  if (id === clear) {
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
