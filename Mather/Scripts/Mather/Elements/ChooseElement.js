$(document).ready(function () {

    $("div.choose-element button").each(function (index, item) {
        var element = $(item);
        var chooseElement = element.parent();

        element.click(function () {
            var isChecked = element.hasClass("checked");

            if (!isChecked) {
                chooseElement.children("button").removeClass("checked");
                element.addClass("checked");
            }
        });
    });
});