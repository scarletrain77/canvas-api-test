var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var _this = this;
window.onload = function () {
    var canvas = document.getElementById("myCanvas");
    var context2D = canvas.getContext("2d");
    var stage = new DisplayObjectContainer();
    var textField = new TextField();
    textField.text = "aaa";
    textField.x = 10;
    textField.y = 20;
    textField.textColor = "#ff0000";
    //textField.alpha = .5;
    //textField.rotation = 180;
    var textField_2 = new TextField();
    textField_2.text = "Hello world";
    //textField_2.rotation = 90;
    textField_2.textSize = 50;
    textField_2.x = 50;
    textField_2.y = 50;
    var imageBitmap = new Bitmap();
    imageBitmap.name = "girl.jpg";
    imageBitmap.x = 10;
    imageBitmap.y = 30;
    //imageBitmap.alpha = 0.5;
    //imageBitmap.rotation = 45;
    //单位矩阵
    //context2D.setTransform(1, 0, 0, 1, 0, 0);
    //a, b,c, d, tx, ty
    //a:x坐标放大倍数，d:y坐标放大倍数, tx向右平移， ty向下平移
    //context2D.setTransform(1, 0, 0, 1, 0, 0)
    stage.addChild(imageBitmap);
    stage.addChild(textField);
    stage.addChild(textField_2);
    stage.alpha = 0.5;
    stage.draw(context2D);
    setInterval(function () {
        context2D.setTransform(1, 0, 0, 1, 0, 0);
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        stage.draw(context2D);
    }, 30);
    var curTarget;
    var staTarget;
    var isMouseDown = false;
    var staPoint = new math.Point(0, 0);
    var movingPoint = new math.Point(0, 0);
    var container = new DisplayObjectContainer();
    textField.addEventListener(TouchEventsType.MOUSEMOVE, function () {
        if (curTarget == staTarget) {
            container.x += (TouchEventService.stageX - movingPoint.x);
            container.y += (TouchEventService.stageY - movingPoint.y);
            alert("listhhh");
        }
    }, _this);
    textField_2.addEventListener(TouchEventsType.CLICK, function () {
        alert("You have click!");
        console.log("button");
    }, _this);
    window.onmousedown = function (e) {
        var x = e.offsetX;
        var y = e.offsetY;
        TouchEventService.stageX = x;
        TouchEventService.stageY = y;
        staPoint.x = x;
        staPoint.y = y;
        movingPoint.x = x;
        movingPoint.y = y;
        TouchEventService.currentType = TouchEventsType.MOUSEDOWN;
        curTarget = stage.hitTest(x, y);
        staTarget = curTarget;
        TouchEventService.getInstance().toDo();
        isMouseDown = true;
    };
    window.onmouseup = function (e) {
        var x = e.offsetX;
        var y = e.offsetY;
        TouchEventService.stageX = x;
        TouchEventService.stageY = y;
        var target = stage.hitTest(x, y);
        if (target == curTarget) {
            TouchEventService.currentType = TouchEventsType.CLICK;
        }
        else {
            TouchEventService.currentType = TouchEventsType.MOUSEUP;
        }
        TouchEventService.getInstance().toDo();
        curTarget = null;
        isMouseDown = false;
    };
    window.onmousemove = function (e) {
        if (isMouseDown) {
            var x = e.offsetX;
            var y = e.offsetY;
            TouchEventService.stageX = x;
            TouchEventService.stageY = y;
            TouchEventService.currentType = TouchEventsType.MOUSEMOVE;
            curTarget = stage.hitTest(x, y);
            TouchEventService.getInstance().toDo();
            movingPoint.x = x;
            movingPoint.y = y;
        }
    };
};
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.call(this);
        this.width = -1;
        this.height = -1;
        this.name = "";
        this.image = null;
        this.isLoaded = false;
        this.image = document.createElement("img");
    }
    Bitmap.prototype.render = function (context2D) {
        var _this = this;
        if (this.isLoaded) {
            context2D.drawImage(this.image, 0, 0);
        }
        else {
            this.image.src = this.name;
            this.image.onload = function () {
                context2D.drawImage(_this.image, 0, 0, _this.width, _this.height);
                _this.isLoaded = true;
            };
        }
    };
    Bitmap.prototype.hitTest = function (x, y) {
        console.log("bitmap");
        var rect = new math.Rectangle();
        rect.x = rect.y = 0;
        if (this.height == -1 && this.width == -1) {
            rect.width = this.image.width;
            rect.height = this.image.height;
        }
        else {
            rect.width = this.width;
            rect.height = this.height;
        }
        if (rect.isPointInReactangle(new math.Point(x, y))) {
            return this;
        }
        return null;
    };
    return Bitmap;
}(DisplayObject));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
        this.text = "";
        this.textColor = "#000000";
        this.textSize = 12;
        this.textFont = "Calibri";
    }
    TextField.prototype.render = function (context2D) {
        context2D.fillStyle = this.textColor.toLocaleUpperCase();
        context2D.font = this.textSize.toString() + "pt " + this.textFont;
        context2D.fillText(this.text, 0, 0);
    };
    TextField.prototype.hitTest = function (x, y) {
        var rect = new math.Rectangle();
        var point = new math.Point(x, y);
        rect.x = 0;
        rect.y = 0;
        rect.width = this.textSize * this.text.length;
        rect.height = this.textSize;
        var invertChildLocalMatrix = math.invertMatrix(this.localMatrix);
        var pointBaseOnChild = math.pointAppendMatrix(new math.Point(x, y), invertChildLocalMatrix);
        return rect.isPointInReactangle(pointBaseOnChild);
    };
    return TextField;
}(DisplayObject));
//# sourceMappingURL=main.js.map