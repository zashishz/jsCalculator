/**
 * Get All references
 */
var numberKey = Array.from(document.querySelectorAll(".num"));
var funcKey = Array.from(document.querySelectorAll(".func"));
var result = document.getElementById("result");
var screen = document.getElementById("conso");
result.innerHTML = 0;

var num = "";
var isClicked = false;
var decimalCounter = 0;
var numbers = [];
var operators = [];

//if Pressed Key is a Number/Decimal
numberKey.map(function (val) {
    val.addEventListener('click', function (e) {
        let number = e.target.innerHTML;

        //No repetitive decimals are allowed
        if(number == '.') {
            decimalCounter++;
        }
        if(number== '.' && decimalCounter >1) {
            return;
        }
        num = num.length < 8 ? (num + (number)) : num;
        screen.innerHTML = (operators.length > 0) ? numbers[0] + operators[0] + num : num;
    })
});

//if Pressed Key is a Function
funcKey.map(function (val) {

    val.addEventListener('click', function (e) {
        let operator = e.target.innerHTML;
        decimalCounter = 0;
        if (operator == "AC") {
            screen.innerHTML = "";
            result.innerHTML = 0;
            numbers.length = 0;
            operators.length = 0;
            num = "";
        } else if (operator == "CE") {
            screen.innerHTML = result.innerHTML;
            operators.length = 0;
            numbers.length = 0;
            num = result.innerHTML;
        }
        else if (num && operator != '=' && numbers.length <= 2) {
            numbers.push(num);
            num = "";
            operators.push(operator);
            if (operators[1]) {
                result.innerHTML = restrictDigits(numbers[0], numbers[1], operators[0]);
                num = result.innerHTML;
                let newOperator = operators[1];
                screen.innerHTML = num + newOperator;
                numbers.length = 0;
                operators.length = 0;
                numbers[0] = num;
                operators[0] = newOperator;
                num = "";                
                isClicked = false;
            } else {
                isClicked = false;
                screen.innerHTML = numbers[0] + operators[0];
            }
        } else if (operator == '=' && !isClicked) {
            numbers.push(num);
            screen.innerHTML = numbers[0] + operators[0] + numbers[1];
            result.innerHTML = restrictDigits(numbers[0], numbers[1], operators[0]);
            numbers.length = 0;
            num = parseFloat(result.innerHTML);
            operators.length = 0;
            isClicked = true;
        }
    })
});

//to discriminate between Integer and Float type
function isInt(n) {
    return n % 1 === 0;
}

// Evaluate
function operate(num1, num2, operator) {
    return eval(num1 + operator + num2);
}

//Restrict result to 8 Digits
function restrictDigits(num1, num2, operator) {
    let finalResult = operate(num1, num2, operator);
    finalResult = isInt(finalResult) ? finalResult.toString() : finalResult.toFixed(2).toString();
    return finalResult.length > 10 ? "OUT OF RANGE" : finalResult;
}