window.onload = () => {
    var canvas = document.getElementById("myCanvas") as HTMLCanvasElement;

    var stage = engine.run(canvas);

    var textField: engine.TextField = new engine.TextField();
    textField.text = "aaa";
    textField.x = 10;
    textField.y = 20;
    textField.textColor = "#ff0000";

    stage.addChild(textField);

    engine.Ticker.getInstance().register((deltaTime) => {
        console.log("aaa")
        //bitmap.x += 1;
    });
}

var canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
var stage = engine.run(canvas);

var textField: engine.TextField = new engine.TextField();
textField.text = "aaa";
textField.x = 10;
textField.y = 20;
textField.textColor = "#ff0000";


stage.addChild(textField);
console.log("aaa");

engine.Ticker.getInstance().register((deltaTime) => {
    console.log("aaa")
    //bitmap.x += 1;
});

console.log("aaa");