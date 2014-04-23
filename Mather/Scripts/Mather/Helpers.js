$(document).ready(function () {

    //Help list header hanler
    $("div.helper label").each(function (index, element) {
        var listDiv = $(this).parent().children("div");

        $(element).click(function () {
            if (listDiv.css("visibility") == "visible") {
                HideHelperList(listDiv);
            } else {
                ShowHelperList(listDiv);
            }
        });

        //Hide current helper
        HideHelperList(listDiv);
    });

    //Helper item handler
    var mathInput = $("input.math-input");

    $("div.helper td").each(function (index, element) {

        $(element).click(function () {
            var value = $(element).attr("data-value");

            //Try to get value from element text, eg sin(x) -> sin(
            if (typeof value === "undefined") {
                value = $(element).text();

                var indexOfFirstBracket = value.indexOf("(");
                if (indexOfFirstBracket != -1) {
                    value = value.slice(0, indexOfFirstBracket + 1);
                }
            }

            mathInput.val(mathInput.val() + value);

            CalculateToMathInput();
        });
    });
});

function HideHelperList(listDiv) {
    $(listDiv).css("visibility", "hidden");
    $(listDiv).css("height", "0");
    $(listDiv).css("padding", "0");
}

function ShowHelperList(listDiv) {
    $(listDiv).css("visibility", "visible");
    $(listDiv).css("height", "100%");
    $(listDiv).css("padding", "6px");
}
