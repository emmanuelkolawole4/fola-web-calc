function calculatorOff() {
    calculatorOnOffButton.innerText = 'ON';
    outputArea.style.background = 'black';
    this.currentOperand = 0;
    this.previousOperand = '';
    this.operation = undefined; 
}

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        // this.toggleCalculatorOn();
        this.clear();
    }

    toggleCalculatorOn() {

        // switch(outputArea.style.background) {
        //     case 'black':
        //         outputArea.style.background = 'gold';  
        //         break;
        //     case 
        // }
        if (calculatorOnOffButton.innerText === 'ON' && outputArea.style.background === 'black') {
            outputArea.style.background = 'gold';
            calculatorOnOffButton.innerText = 'OFF';
        } else if (calculatorOnOffButton.innerText === 'OFF' && outputArea.style.background === 'gold') {
            outputArea.style.background = 'black';
            calculatorOnOffButton.innerText = 'ON';
        }
    }

    clear() {
        this.currentOperand = 0;
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let result;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+' :
                result = prev + current;
                break;
            case '-' :
                    result = prev - current;
                    break;
            case 'x' :
                    result = prev * current;
                    break;
            case '/' :
                    result = prev / current;
                    break;
            default:
                return;
            
        }
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits : 0});
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}




const calculatorOnOffButton = document.querySelector('[data-on]');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const outputArea = document.querySelector('[data-output]');



// switch(onCalculator.textContent) {
//     case 'OFF':

// }

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

calculatorOnOffButton.addEventListener('click', () => {
    calculator.toggleCalculatorOn();
})

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})

