var math = mathjs();

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