import calculatorFunctions from "./interfaces/calculatorFunctions.js";

class Calculator implements calculatorFunctions{

    private currentOperand: string;
    private previousOperand: string;
    private operation: any;
    constructor(
        readonly previousOperandTextElement: HTMLDivElement, 
        readonly currentOperandTextElement: HTMLDivElement,
        
    ){
        this.clear()
    }

    clear(): void {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete(): void {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number: string): void {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation<T extends string>(operation: T): void {
        if(this.currentOperand === '') return
        if(this.previousOperand !== '' ) {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(): void {
        let computation: number  
        const prev: number = parseFloat(this.previousOperand)
        const current: number = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        } 
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number: number): string {
        const stringNumber: string = number.toString();
        const integerDigits: number = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits: string = stringNumber.split('.')[1 ];
        let integerDisplay: string;
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en' , {
                maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay(): void {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(parseInt(this.currentOperand))
        if(this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(parseInt(this.previousOperand))} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }

}

const numberButtons = document.querySelectorAll('[data-number]') as NodeListOf<Element>;
const operationButtons = document.querySelectorAll('[data-operation]') as NodeListOf<Element>;
const equalsButton = document.querySelector('[data-equals]') as HTMLButtonElement;
const deleteButton = document.querySelector('[data-delete]') as HTMLButtonElement;
const allClearButton = document.querySelector('[data-all-clear]') as HTMLButtonElement;
const previousOperandTextElement = document.querySelector('[data-previous-operand]') as HTMLDivElement;
const currentOperandTextElement = document.querySelector('[data-current-operand]') as HTMLDivElement;

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach((button: HTMLElement) => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach((button: HTMLElement) => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})