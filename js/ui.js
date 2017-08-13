let toolbar = document.querySelector('.toolBar');

var object = new WinJS.UI.ToolBar(toolbar);

WinJS.UI.processAll().done(function () {
    let splitView = document.querySelector(".splitView").winControl;
    new WinJS.UI._WinKeyboard(splitView.paneElement); // Temporary workaround: Draw keyboard focus visuals on NavBarCommands
});




WinJS.UI.processAll();
