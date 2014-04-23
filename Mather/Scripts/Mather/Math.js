var math = mathjs();

$(document).ready(function () {
    //Input event handler
    $("input.math-input").keyup(function () {
        CalculateToMathInput();
    });

    CreateFunctionShell();
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
        //There is error in math.js. "Error(char n)" must be "Error(char n-1)"
        var message = e.message;
        var startReplaceIndex = message.indexOf("char ");

        if (startReplaceIndex == -1) {
            result.error = message;
        } else {
            var endReplaceIndex = message.indexOf(")", startReplaceIndex);

            var charLength = 5; //length of "char "
            var errorPosition = message.substr(startReplaceIndex + charLength, endReplaceIndex - charLength - startReplaceIndex);

            result.error = message.substr(0, startReplaceIndex + charLength) + (parseInt(errorPosition) - 1) + ")";   
        }
    }

    return result;
}

function GetAngleCoefficient() {
    switch (MatherSettings.angleType) {
        case "rad":
            return 1;
        case "deg":
            return 0.017453292519943295769236907684888;
        case "grad":
            return 0.015707963267948966192313216916399;
        case "cycle":
            return 6.2831853071795864769252867665793;
        default:
            alert("There is error in GetAngleCoefficient() function, result is not right." +
                "Please write author of Mather(see About Mather) about it!");
            return 1;
    }
}
function GetRadFromAngle(angle) {
    var k = GetAngleCoefficient();

    if (IsNumber(angle))
    {
        return k * angle;
    }

    if (IsComplex(angle)) {
        return new math.type.Complex(k * angle.re, k * angle.im);
    }

    return angle;
}

function GetAngleFromRad(angle) {
    var k = GetAngleCoefficient();

    if (IsNumber(angle)) {
        return angle/k;
    }

    if (IsComplex(angle)) {
        return new math.type.Complex(angle.re / k, angle.im / k);
    }

    return angle;
}

function CreateFunctionShell() {
    //Convert argument: func(x) -> func(ToRad(x))
    var argFuncNameArray = ["sin", "cos", "tan", "cot", "sec", "csc"];

    for (var argI in argFuncNameArray) {
        var argFuncName = argFuncNameArray[argI], argObj = {};

        argObj[argFuncName] = function () {
            var func = math[argFuncName];
            return function (x) {
                return func(GetRadFromAngle(x));
            };
        } ();

        math.import(argObj, { override: true });
    };

    //Convert result: func(x) => ToRad(func(x))
    var resultFuncNameArray = ["asin", "acos", "atan"];

    for (var resultI in resultFuncNameArray) {
        var resultFuncName = resultFuncNameArray[resultI], resultObj = {};

        resultObj[resultFuncName] = function () {
            var func = math[resultFuncName];
            return function (x) {
                return GetAngleFromRad(func(x));
            };
        } ();

        math.import(resultObj, { override: true });
    };

    //Create shell of atan2 in separate code, because atan2 take 2 arguments
    var atan2 = math.atan2;
    math.import({
        atan2: function (x, y) {
            return GetAngleFromRad(atan2(x, y));
        }
    }, {
        override: true
    });
}

function IsNumber(value) {
    return (value instanceof Number) || (typeof value == 'number');
}

function IsComplex(value) {
    return (value instanceof math.type.Complex);
}