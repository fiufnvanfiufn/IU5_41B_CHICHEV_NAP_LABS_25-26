window.onload = function() {

    let a = ''
    let b = ''
    let expressionResult = ''
    let selectedOperation = null
    let isAccumulativeMode = false
    let lastResult = ''

    const outputElement = document.getElementById("planet_output")
    const digitButtons = document.querySelectorAll('[id ^= "planet_"]')

    function fact(n) {
        if (n < 0) return 'Ошибка'
        if (n === 0 || n === 1) return 1
        let res = 1
        for (let i = 2; i <= n; i++) res *= i
        return res
    }

    function onDigitButtonClicked(digit) {
        if (!selectedOperation) {
            if ((digit !== '.') || (digit === '.' && !a.includes(digit))) {
                a += digit
            }
            outputElement.innerHTML = a
        } else {
            if ((digit !== '.') || (digit === '.' && !b.includes(digit))) {
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

    document.getElementById("cosmic_mult").onclick = function() {
        if (a === '') return
        selectedOperation = 'x'
    }

    document.getElementById("cosmic_plus").onclick = function() {
        if (a === '') return
        if (selectedOperation === '+') {
            isAccumulativeMode = true
            if (b === '') b = a
            calculateResult()
        } else {
            isAccumulativeMode = false
        }
        selectedOperation = '+'
        b = ''
    }

    document.getElementById("cosmic_minus").onclick = function() {
        if (a === '') return
        if (selectedOperation === '-') {
            isAccumulativeMode = true
            if (b === '') b = a
            calculateResult()
        } else {
            isAccumulativeMode = false
        }
        selectedOperation = '-'
        b = ''
    }

    document.getElementById("cosmic_div").onclick = function() {
        if (a === '') return
        selectedOperation = '/'
    }

    document.getElementById("cosmic_sign").onclick = function() {
        if (!selectedOperation && a !== '') {
            a = ((+a) * -1).toString()
            outputElement.innerHTML = a
        } else if (selectedOperation && b !== '') {
            b = ((+b) * -1).toString()
            outputElement.innerHTML = b
        }
    }

    document.getElementById("cosmic_delete").onclick = function() {
        if (!selectedOperation && a !== '') {
            a = a.slice(0, -1)
            outputElement.innerHTML = a || '0'
        } else if (selectedOperation && b !== '') {
            b = b.slice(0, -1)
            outputElement.innerHTML = b || '0'
        }
    }

    document.getElementById("cosmic_sqrt").onclick = function() {
        let target = (selectedOperation && b !== '') ? b : a
        if (target === '' || (+target) < 0) {
            outputElement.innerHTML = 'Ошибка'
            return
        }
        let res = Math.sqrt((+target)).toString()
        if (!selectedOperation) a = res; else b = res;
        outputElement.innerHTML = res
    }

    document.getElementById("cosmic_square").onclick = function() {
        let target = (selectedOperation && b !== '') ? b : a
        if (target === '') return
        let res = Math.pow((+target), 2).toString()
        if (!selectedOperation) a = res; else b = res;
        outputElement.innerHTML = res
    }

    document.getElementById("cosmic_clear").onclick = function() {
        a = ''
        b = ''
        selectedOperation = ''
        expressionResult = ''
        outputElement.innerHTML = 0
    }

    function calculateResult() {
        if (a === '' || b === '' || !selectedOperation) return

        let numA = parseFloat(a)
        let numB = parseFloat(b)

        switch(selectedOperation) {
            case '+': expressionResult = numA + numB; break
            case '-': expressionResult = numA - numB; break
            case 'x': expressionResult = numA * numB; break
            case '/':
                expressionResult = numB !== 0 ? numA / numB : 'Ошибка';
                break
        }

        a = expressionResult.toString()
        b = isAccumulativeMode ? a : ''
        outputElement.innerHTML = a
    }

    document.getElementById("cosmic_equal").onclick = function() {
        calculateResult()
        isAccumulativeMode = false
        selectedOperation = null
    }

    document.getElementById("cosmic_factorial").onclick = function() {
        let target = (selectedOperation && b !== '') ? b : a
        if (target === '') return
        let res = fact(+target).toString()
        if (!selectedOperation) a = res; else b = res;
        outputElement.innerHTML = res
    }

    const themeToggle = document.getElementById("btn_nebula_theme")
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

    let lunarOpen = false

document.getElementById("cosmic_lunar").onclick = function() {
    let input = (!selectedOperation || b === '') ? a : b

    if (input.length !== 8) {
        outputElement.innerHTML = "Формат: ГГГГММДД"
        return
    }

    let year = parseInt(input.slice(0, 4))
    let month = parseInt(input.slice(4, 6))
    let day = parseInt(input.slice(6, 8))

    if (month < 1 || month > 12 || day < 1 || day > 31) {
        outputElement.innerHTML = "Ошибка даты"
        return
    }

    if (month < 3) {
        year--
        month += 12
    }

    let c = 365.25 * year
    let e = 30.6 * (month + 1)
    let jd = c + e + day - 694039.09
    jd /= 29.5305882

    let tmp = parseInt(jd)
    jd -= tmp
    let phase = Math.round(jd * 8)

    const phases = [
        "Новолуние",
        "Растущий серп",
        "Первая четверть",
        "Растущая луна",
        "Полнолуние",
        "Убывающая луна",
        "Последняя четверть",
        "Старая луна",
        "Новолуние"
    ]

    outputElement.innerHTML = phases[phase]
}
}
