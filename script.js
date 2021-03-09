const numbers = document.querySelectorAll('.button_digit');
const operations = document.querySelectorAll('.button_operation, .button_operation_equals');
const decimal = document.getElementById('dot');
const clearButtons = document.querySelectorAll('.button_clean');
const display = document.getElementById('display');
const CLEAR = 'c';
const MAX_DIGITS = 10;
const LIMIT_DIGITS = 6;
const BIG_DIGIT = Math.pow(10, 9);
let memoryCurrentNumber = 0;
let memoryNewNumber = false;
let memoryPendingOperation = '';

const operandEnter = (number) => {
  if (memoryNewNumber) {
    display.value = number;
    memoryNewNumber = false;
  } else display.value === '0' ? display.value = number : display.value += number;
  display.value = display.value.substring(0,10);
};

numbers.forEach((e, i) => numbers[i].addEventListener('click', (e) => operandEnter(e.target.textContent)));

const operatorEnter = (op) => {
  let localOperationMemory = display.value;
  if (memoryNewNumber && memoryPendingOperation !== '=') display.value = memoryCurrentNumber;
    else { 
      memoryNewNumber = true;
    switch (memoryPendingOperation) {
      case '+':
        memoryCurrentNumber += +localOperationMemory;
        break;
      case '-':
        memoryCurrentNumber = (memoryCurrentNumber * BIG_DIGIT - (+localOperationMemory * BIG_DIGIT)) / BIG_DIGIT;
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
    display.value = `${memoryCurrentNumber}`.length < MAX_DIGITS ? memoryCurrentNumber : memoryCurrentNumber.toPrecision(LIMIT_DIGITS);
    memoryPendingOperation = op;
  } 
};

operations.forEach((e, i) => operations[i].addEventListener('click', (e) => operatorEnter(e.target.textContent)));

const clearDisplay = (id) => {
  display.value = '0';
  memoryNewNumber = true;
  if (id === CLEAR) {
    memoryCurrentNumber = 0;
    memoryPendingOperation = '';
  };
};

clearButtons.forEach((e, i) => clearButtons[i].addEventListener('click', (e) => clearDisplay(e.srcElement.id)));

decimal.addEventListener('click', decimalPoint = () => {
  let localDecimalMemory = display.value;
  if (memoryNewNumber) {
    localDecimalMemory = '0.';
    memoryNewNumber = false;
  } else if (localDecimalMemory.indexOf('.') === -1) localDecimalMemory += '.'; 
  display.value = localDecimalMemory;
}); 
