var math = mathjs();

$(document).ready(function () {
    //Input event handler
    $("input.math-input").keyup(function () {
        CalculateToMathInput();
    });
});

function CalculateToMathInput() {
    var value = $("input.math-input").val();
    var label = $("label.answer-label");

    if (value.length == 0) {
        label.text('');
        return;
    }

    var result = Calculate(value);

    //If all right
    if (result.error == null) {
        label.text('= ' + result.answer);
    } else {
        label.text(result.error);
    }
}

function Calculate(expression) {
    var result =
    {
        answer: null,
        error: null
    };

    try {
        result.answer = math.format(math.eval(expression));
    } catch (e) {
        result.error = e.message;
    }

    return result;
}