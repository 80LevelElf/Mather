var MatherSettings = new Object();

function ReadSettings() {
    if (!Cookies.enabled) {
        alert("You turn off cookies in your browser, please turn on it." +
            " Without it you can't save your settings!");
    }

    //Get angle type
    var angleType = Cookies.get("angleType");

    if (angleType === undefined) { //There is no such property in cookies
        angleType = "rad";
    }
    MatherSettings.angleType = angleType;
}

function GetSetting(name) {
    if (MatherSettings[name] === undefined) {
        ReadSettings();
    }

    return MatherSettings[name];
}