var numberKey = Array.from(document.querySelectorAll(".num"));
var funcKey = Array.from(document.querySelectorAll(".func"));
var result = document.getElementById("result");
var screen = document.getElementById("conso");
result.innerHTML = 0;

var num = "";
var isClicked = false;
var numbers = [];
var operators = [];
numberKey.map(function (val) {
    val.addEventListener('click', function (e) {
        isClicked = true;
        num = num.length <8 ? (num + (e.target.innerHTML)): num;
        screen.innerHTML = (operators.length>0)?numbers[0]+operators[0]+num: num;
    })
});

funcKey.map(function (val) {

    val.addEventListener('click', function (e) {
        let operator = e.target.innerHTML;
        if(operator == "AC") {
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
        else if (num && numbers.length < 2) {
            numbers.push(num);
            num = "";
            operators.push(operator);
            console.log(operators);
            console.log(numbers);
            screen.innerHTML = numbers[0]+operators[0];
            if (operator == '=' ) {
                let finalResult = operate(numbers[0], numbers[1], operators[0]);
                screen.innerHTML = numbers[0]+operators[0]+numbers[1];
                finalResult = isInt(finalResult)?finalResult.toString():finalResult.toFixed(2).toString();
                result.innerHTML = finalResult.length>10?"OUT OF RANGE": finalResult;
                numbers.length = 0;
                num = parseFloat(result.innerHTML);
                operators.length = 0;
                isClicked = false;
            }
        } else {

        }
    })
});

function isInt(n) {
   return n % 1 === 0;
}

function operate(num1, num2, operator) {
    return eval(num1 + operator + num2);
}