window.onload = function(){

const MAX_LENGTH = 10

let a = ''
let b = ''
let expressionResult = ''
let selectedOperation = null

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
    selectedOperation = '+'
}
document.getElementById("btn_op_minus").onclick = function() {
    if (a === '') return
    selectedOperation = '-'
}
document.getElementById("btn_op_div").onclick = function() {
    if (a === '') return
    selectedOperation = '/'
}

document.getElementById("btn_op_sign").onclick = function() {
    if (!selectedOperation && a !== '') {
        a = (parseFloat(a) * -1).toString()
        outputElement.innerHTML = a

    } else if (selectedOperation && b !== '') {
        b = (parseFloat(b) * -1).toString()
        outputElement.innerHTML = b

    } else if (lastResult !== '') {
        lastResult = (parseFloat(lastResult) * -1).toString()
        a = lastResult
        outputElement.innerHTML = a
    }
}

document.getElementById("btn_op_percent").onclick = function() {
    if (!selectedOperation && a !== '') {
        a = (parseFloat(a) / 100).toString()
        outputElement.innerHTML = a

    } else if (selectedOperation && b !== '') {
        b = (parseFloat(b) / 100).toString()
        outputElement.innerHTML = b
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
        a = Math.sqrt(parseFloat(a)).toString()
        outputElement.innerHTML = a

    } else if (selectedOperation && b !== '') {
        b = Math.sqrt(parseFloat(b)).toString()
        outputElement.innerHTML = b

    } else if (lastResult !== '') {
        lastResult = Math.sqrt(parseFloat(lastResult)).toString()
        a = lastResult
        selectedOperation = null
        outputElement.innerHTML = a
    }
}

document.getElementById("btn_op_secdg").onclick = function() {
    if (!selectedOperation && a !== '') {
        a = Math.pow(parseFloat(a), 2).toString()
        outputElement.innerHTML = a

    } else if (selectedOperation && b !== '') {
        b = Math.pow(parseFloat(b), 2).toString()
        outputElement.innerHTML = b

    } else if (lastResult !== '') {
        lastResult = Math.pow(parseFloat(lastResult), 2).toString()
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

document.getElementById("btn_op_equal").onclick = function() {
    if (a === '' || b === '' || !selectedOperation)
        return

    switch(selectedOperation) {
        case 'x':
            expressionResult = (+a) * (+b)
            break;
        case '+':
            expressionResult = (+a) + (+b)
            break;
        case '-':
            expressionResult = (+a) - (+b)
            break;
        case '/':
            expressionResult = (+a) / (+b)
            break;
    }

    a = expressionResult.toString()
    b = ''
    selectedOperation = null

    outputElement.innerHTML = a
}

document.getElementById("btn_op_factorial").onclick = function() {
    let num
    if (!selectedOperation && a !== '') {
        num = parseInt(a)

    } else if (selectedOperation && b !== '') {
        num = parseInt(b)

    } else if (lastResult !== '') {
        num = parseInt(lastResult)

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

};
