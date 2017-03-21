var canvas = document.getElementById("app");
var stage = engine.run(canvas);
var bitmap = new engine.Bitmap();
var text = new engine.TextField();
text.text = "hello~";
text.textSize = 200;
text.y = 100;
stage.addChild(text);
var image = document.createElement("img");
image.src = "Resource/wander-icon.jpg";
bitmap.image = image;
var speed = 10;
stage.addChild(bitmap);
/*text.addEventListener(engine.TouchEventsType.MOUSEDOWN, (e)=>{
    alert("bitmap");
}, text, false);*/
var shape = new engine.Shape();
shape.width = 100;
shape.height = 100;
shape.y = 200;
shape.touchEnabled = true;
shape.addEventListener(engine.TouchEventsType.CLICK, function (e) {
    alert("touch");
}, shape, false);
stage.addChild(shape);
engine.Ticker.getInstance().register(function (deltaTime) {
    bitmap.x += 1;
});
