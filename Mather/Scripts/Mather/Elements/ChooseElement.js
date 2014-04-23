$(document).ready(function () {
    //Load settings
    var angleType = GetSetting("angleType");
    $("div.choose-element button").filter(function() {
        return $(this).text() == angleType;
    }).addClass("checked");

    //Event handler
    $("div.choose-element button").each(function (index, item) {
        var element = $(item);
        var chooseElement = element.parent();

        element.click(function () {
            var isChecked = element.hasClass("checked");

            if (!isChecked) {
                chooseElement.children("button").removeClass("checked");
                element.addClass("checked");

                var newAngleType = element.text();
                Cookies.set("angleType", newAngleType);
                MatherSettings.angleType = newAngleType;
                CalculateToMathInput();
            }
        });
    });
});