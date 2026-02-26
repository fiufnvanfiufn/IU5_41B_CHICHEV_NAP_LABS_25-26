window.onload = function(){

let a = ''
let b = ''
let expressionResult = ''
let selectedOperation = null
let isAccumulativeMode = false
let lastResult = ''

outputElement = document.getElementById("result")

digitButtons = document.querySelectorAll('[id ^= "btn_digit_"]')

function onDigitButtonClicked(digit) {
    if (!selectedOperation) {
        if ((digit != '.') || (digit == '.' && !a.includes(digit))) {
            a += digit
        }
        outputElement.innerHTML = a
    } else {
        if ((digit != '.') || (digit == '.' && !b.includes(digit))) {
            b += digit
            outputElement.innerHTML = b
        }
    }
}

digitButtons.forEach(button => {
    button.onclick = function() {
        const digitValue = button.innerHTML
        onDigitButtonClicked(digitValue)
    }
});

document.getElementById("btn_op_mult").onclick = function() {
    if (a === '') return
    selectedOperation = 'x'
}
document.getElementById("btn_op_plus").onclick = function() {
    if (a === '') return
    if (selectedOperation === '+') {
        isAccumulativeMode = true

        if (b === '') {
            b = a
        }
        calculateResult()
    } else {
        isAccumulativeMode = false
    }
    selectedOperation = '+'
    lastOperand = a
    b = ''
}
document.getElementById("btn_op_minus").onclick = function() {
    if (a === '') return
    if (selectedOperation === '-') {
        isAccumulativeMode = true

        if (b === '') {
            b = a
        }
        calculateResult()
    } else {
        isAccumulativeMode = false
    }
    selectedOperation = '-'
    lastOperand = a
    b = ''
}
document.getElementById("btn_op_div").onclick = function() {
    if (a === '') return
    selectedOperation = '/'
}

document.getElementById("btn_op_sign").onclick = function() {
    if (!selectedOperation && a !== '') {
        a = ((+a) * -1).toString()
        outputElement.innerHTML = a

    } else if (selectedOperation && b !== '') {
        b = ((+b) * -1).toString()
        outputElement.innerHTML = b

    } else if (lastResult !== '') {
        lastResult = ((+lastResult) * -1).toString()
        a = lastResult
        outputElement.innerHTML = a
    }
}

document.getElementById("btn_op_inverse").onclick = function() {
    if (!selectedOperation && a !== '') {
        if ((+a) === 0) {
            outputElement.innerHTML = 'Ошибка'
            return
        }

        a = (1 / (+a)).toString()
        outputElement.innerHTML = a

    } else if (selectedOperation && b !== '') {
        if ((+b) === 0) {
            outputElement.innerHTML = 'Ошибка'
            return
        }

        b = (1 / (+b)).toString()
        outputElement.innerHTML = b

    } else if (lastResult !== '') {

        if ((+lastResult) === 0) {
            outputElement.innerHTML = 'Ошибка'
            return
        }

        lastResult = (1 / (+lastResult)).toString()
        a = lastResult
        selectedOperation = null
        outputElement.innerHTML = a
    }
}

document.getElementById("btn_op_del").onclick = function() {
    if (!selectedOperation && a !== '') {
        a = a.slice(0, -1)
        outputElement.innerHTML = a || '0'

    } else if (selectedOperation && b !== '') {
        b = b.slice(0, -1)
        outputElement.innerHTML = b || '0'
    }
}

document.getElementById("btn_op_sqrt").onclick = function() {
    if (!selectedOperation && a !== '') {
        a = Math.sqrt((+a)).toString()
        outputElement.innerHTML = a

    } else if (selectedOperation && b !== '') {
        b = Math.sqrt((+b)).toString()
        outputElement.innerHTML = b

    } else if (lastResult !== '') {
        lastResult = Math.sqrt((+lastResult)).toString()
        a = lastResult
        selectedOperation = null
        outputElement.innerHTML = a
    }
}

document.getElementById("btn_op_secdg").onclick = function() {
    if (!selectedOperation && a !== '') {
        a = Math.pow((+a), 2).toString()
        outputElement.innerHTML = a

    } else if (selectedOperation && b !== '') {
        b = Math.pow((+b), 2).toString()
        outputElement.innerHTML = b

    } else if (lastResult !== '') {
        lastResult = Math.pow((+lastResult), 2).toString()
        a = lastResult
        selectedOperation = null
        outputElement.innerHTML = a
    }
}

document.getElementById("btn_op_clear").onclick = function() {
    a = ''
    b = ''
    selectedOperation = ''
    expressionResult = ''
    outputElement.innerHTML = 0
}

function calculateResult() {
    if (a === '' || b === '' || !selectedOperation) {
        return
    }

    switch(selectedOperation) {
        case '+':
            expressionResult = (+a) + (+b)
            break
        case '-':
            expressionResult = (+a) - (+b)
            break
        case 'x':
            expressionResult = (+a) * (+b)
            break
        case '/':
            if ((+b) === 0) {
                outputElement.innerHTML = 'Ошибка'
                return
            }
            expressionResult = (+a) / (+b)
            break
    }

    a = expressionResult.toString()

    if (isAccumulativeMode) {
        b = a
    } else {
        b = ''
    }

    outputElement.innerHTML = a
}

document.getElementById("btn_op_equal").onclick = function() {
    calculateResult()
    isAccumulativeMode = false
}

document.getElementById("btn_op_factorial").onclick = function() {
    let num
    if (!selectedOperation && a !== '') {
        num = (+a)

    } else if (selectedOperation && b !== '') {
        num = (+b)

    } else if (lastResult !== '') {
        num = (+lastResult)

    } else {
        return
    }

    if (num < 0) {
        outputElement.innerHTML = 'Ошибка'
        return
    }

    let factorial = 1
    for (let i = 2; i <= num; i++) {
        factorial *= i
    }

    if (!selectedOperation && a !== '') {
        a = factorial.toString()
        outputElement.innerHTML = a

    } else if (selectedOperation && b !== '') {
        b = factorial.toString()
        outputElement.innerHTML = b

    } else if (lastResult !== '') {
        lastResult = factorial.toString()
        a = lastResult
        selectedOperation = null
        outputElement.innerHTML = a
    }
}

const themeToggle = document.getElementById("btn_switch_theme")

document.body.className = 'dark-theme'
themeToggle.innerHTML = 'Светлая тема'

themeToggle.onclick = function() {
    if (document.body.classList.contains('dark-theme')) {
        document.body.className = 'light-theme'
        themeToggle.innerHTML = 'Темная тема'
    } else {
        document.body.className = 'dark-theme'
        themeToggle.innerHTML = 'Светлая тема'
    }
}

};
