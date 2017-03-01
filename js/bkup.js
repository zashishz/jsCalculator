var val = "";
var num1 = 0;
var operator;

$("#result").text(0);
$("#console").text("");

$("button").on('click', function () {
    // $("#console").append($(this).text());
    if($(this).attr('class') === 'num') {
        if(val.length <= 6) {
            val = val+$(this).text();
            $("#console").text(val);
        }
    } else if(($(this).attr('class') === 'func') && (val.length > 0 && num1 == 0)) {
        num1 = val;
        val = "";
        operator = $(this).text();
    } else {
        num1 = eval(num1+operator+val);
        $("#result").text(num1);
    }
});

//if($(this).attr('class') === 'func')

// $("button").on('keydown', function () {
//     console.log("pressed");
// })



// $("button").on('click', function () {
//     // $("#console").append($(this).text());
//     if($(this).attr('class') === 'func') {
//         if($(this).text() !== "=") {
//             //Save First Number
//             operator = $(this).text();
//             if(val1.length === 0) {
//                 val1 = Number(val);
//                 val = "";
//             } else {
//                 val = eval(val1+operator+val);
//             }
//             $("#result").text(val);
//         } else if($(this).text() === "AC") {
//             val = "";
//             $("#result").text(0);
//             $("#console").text(val);
//         }
//     } else if($(this).attr('class') === 'num') {
//         if(val.length <= 8) {
//             val = val+$(this).text();
//             $("#console").text(val);
//         }
//     }
// });