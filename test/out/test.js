window.onload = function () {
    var canvas = document.getElementById("myCanvas");
    var stage = engine.run(canvas);
    var textField = new engine.TextField();
    textField.text = "aaa";
    textField.x = 10;
    textField.y = 20;
    textField.textColor = "#ff0000";
    stage.addChild(textField);
    engine.Ticker.getInstance().register(function (deltaTime) {
        console.log("aaa");
        //bitmap.x += 1;
    });
};
var canvas = document.getElementById("myCanvas");
var stage = engine.run(canvas);
var textField = new engine.TextField();
textField.text = "aaa";
textField.x = 10;
textField.y = 20;
textField.textColor = "#ff0000";
stage.addChild(textField);
console.log("aaa");
engine.Ticker.getInstance().register(function (deltaTime) {
    console.log("aaa");
    //bitmap.x += 1;
});
console.log("aaa");
//# sourceMappingURL=test.js.map