var numberKey = Array.from(document.querySelectorAll(".num"));
var funcKey = Array.from(document.querySelectorAll(".func"));
var result = document.getElementById("result");
var screen = document.getElementById("conso");
result.innerHTML = 0;

var num = "";
var isClicked = false;
var counter = 0;
var numbers = [];
var operators = [];
numberKey.map(function (val) {
    val.addEventListener('click', function (e) {
        let number = e.target.innerHTML;
        if(number == '.') {
            counter++;
        }
        if(number== '.' && counter >1) {
            return;
        }
        num = num.length < 8 ? (num + (number)) : num;
        screen.innerHTML = (operators.length > 0) ? numbers[0] + operators[0] + num : num;
    })
});

funcKey.map(function (val) {

    val.addEventListener('click', function (e) {
        let operator = e.target.innerHTML;
        counter = 0;
        if (operator == "AC") {
            screen.innerHTML = "";
            result.innerHTML = 0;
            numbers.length = 0;
            operators.length = 0;
            num = "";
        } else if (operator == "CE") {
            screen.innerHTML = "";
            operators.length = 0;
            numbers.length = 0;
            num = result.innerHTML;
        }
        else if (num && operator != '=' && numbers.length <= 2) {
            numbers.push(num);
            num = "";
            operators.push(operator);
            if (operators[1]) {
                let finalResult = operate(numbers[0], numbers[1], operators[0]);
                finalResult = isInt(finalResult) ? finalResult.toString() : finalResult.toFixed(2).toString();
                result.innerHTML = finalResult.length > 10 ? "OUT OF RANGE" : finalResult;
                num = result.innerHTML;
                let newOperator = operators[1];
                screen.innerHTML = num + operators[1];
                numbers.length = 0;
                operators.length = 0;
                numbers[0] = num;
                num = "";
                operators[0] = newOperator;
                isClicked = false;
            } else {
                isClicked = false;
                screen.innerHTML = numbers[0] + operators[0];
            }
        } else if (operator == '=' && !isClicked) {
            numbers.push(num);
            let finalResult = operate(numbers[0], numbers[1], operators[0]);
            screen.innerHTML = numbers[0] + operators[0] + numbers[1];
            finalResult = isInt(finalResult) ? finalResult.toString() : finalResult.toFixed(2).toString();
            result.innerHTML = finalResult.length > 10 ? "OUT OF RANGE" : finalResult;
            numbers.length = 0;
            num = parseFloat(result.innerHTML);
            operators.length = 0;
            isClicked = true;
        }
    })
});

function isInt(n) {
    return n % 1 === 0;
}

function operate(num1, num2, operator) {
    return eval(num1 + operator + num2);
}