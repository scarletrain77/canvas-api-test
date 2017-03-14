var canvas = document.getElementById("app");
var stage = engine.run(canvas);
var bitmap = new engine.BitMap();
bitmap.src = "S_Watcher.png";
stage.addChild(bitmap);
var speed = 10;
engine.Ticker.getInstance().register(function (deltaTime) {
    console.log("aaa");
    bitmap.x += 1;
});
