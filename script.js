let numbers = document.querySelectorAll('.number');
let operations = document.querySelectorAll('.operation');
let decimal = document.getElementById('dot');
let clearButtons = document.querySelectorAll('.clear');
let display = document.getElementById('display');
let memoryCurrentNumber = 0;
let memoryNewNumber = false;
let memoryPendingOperation = '';

for (i = 0; i < numbers.length; i++) {
  let number = numbers[i];
  number.addEventListener('click', (e) => operandEnter(e.target.textContent));
}

let operandEnter = (number) => {
  if (memoryNewNumber) {
    display.value = number;
    memoryNewNumber = false;
  } else {
    if (display.value === '0') {
      display.value = number;
    } else  display.value += number;
  }
     console.log("CLICK-OPERAND " + number + ' !');
};

for (i = 0; i < operations.length; i++) {
  let operationButton = operations[i];
    operationButton.addEventListener('click', (e) => operatorEnter(e.target.textContent));
}

let operatorEnter = (op) => {
  let localOperationMemory = display.value;
  if (memoryNewNumber && memoryPendingOperation !== '=') {
    display.value = memoryCurrentNumber;
  } else {
    memoryNewNumber = true;
    if (memoryPendingOperation === '+') {
      memoryCurrentNumber += +localOperationMemory;
    } else if (memoryPendingOperation === '-') {
      memoryCurrentNumber -= +localOperationMemory;
    } else if (memoryPendingOperation === '*') {
      memoryCurrentNumber *= +localOperationMemory;
    } else if (memoryPendingOperation === '/') {
      memoryCurrentNumber /= +localOperationMemory;
    } else memoryCurrentNumber = +localOperationMemory;   
    display.value = memoryCurrentNumber;
    memoryPendingOperation = op;
  } 
};

for (i = 0; i < clearButtons.length; i++) {
  let clearButton = clearButtons[i];
  clearButton.addEventListener('click', (e) => clearDisplay(e.srcElement.id));
}

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
  } else {
      if (localDecimalMemory.indexOf('.') === -1) localDecimalMemory += '.'; 
  };
  display.value = localDecimalMemory;
}); 
