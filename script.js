    class Calculator{
        constructor(previousOperandTextElement, currentOperandTextElement){
            this.previousOperandTextElement = previousOperandTextElement
            this.currentOperandTextElement = currentOperandTextElement
            this.clear()
        }

        clear( ){
            this.currentOperand = ''
            this.previousOperand = ''
            this.Operation = undefined
        }
        
        dalete( ){
            this.currentOperand = this.currentOperand.toString().slice(0, -1)
        }
        
        appendNumber(number){
            if(number === '.' && this.currentOperand.includes('.'))return
            this.currentOperand = this.currentOperand.toString() + number.toString()
        }
        
        
        chooseOpration (opration ){
            if (this.currentOperand === '') return
            if (this.previousOperand !== '') {
                this.compute()
            }
            this.opration = opration
            this.previousOperand = this.currentOperand
            this.currentOperand = ''
        }

        compute(){
            let compoutation
            const prev = parseFloat(this.previousOperand)
            const current = parseFloat(this.currentOperand)
            if (isNaN(prev) || isNaN(current))return
            switch (this.opration){
                case '+':
                    compoutation = prev + current
                    break
                case '-':
                    compoutation = prev - current
                    break
                case '/':
                    compoutation = prev / current
                    break
                case '*':
                    compoutation = prev * current
                    break
                default:
                    return
            } 
            this.currentOperand = compoutation
            this.opration = undefined
            this.previousOperand = ''
        }
        
        getDisplayNumber(number){
            const floatNmuber = parseFloat(number)
            if (isNaN(floatNmuber)) return''
            return floatNmuber.toLocaleString('')
        }

        updateDisplay(){
            this.currentOperandTextElement.innerText = this.currentOperand  
            this.previousOperandTextElement.innerText = this.previousOperand  
        }

    }   


const numberButtons = document.querySelectorAll('[data-number]')
const oprationButtons = document.querySelectorAll('[data-opration]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-dalete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button =>{
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
    
})
oprationButtons.forEach(button =>{
    button.addEventListener('click', () => {
        calculator.chooseOpration(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
    calculator.dalete()
    calculator.updateDisplay()
})