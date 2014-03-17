$(document).ready(function () {
    //Input event handler
    $("input.math-input").keyup(function () {
        var value = $(this).val();
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
    });

    //Help list header hanler
    $("div.help-list-div label").each(function (index, element) {
        $(element).click(function () {
            var listDiv = $(this).parent().children("div.help-list-multycolumn-div");
            if (listDiv.css("visibility") == "visible") {
                //Hide
                listDiv.css("visibility", "hidden");
                listDiv.css("height", "0");
            } else {
                //Show
                listDiv.css("visibility", "visible");
                listDiv.css("height", "100%");
            }
        });
    });
});
