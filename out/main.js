var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
window.onload = function () {
    var canvas = document.getElementById("myCanvas");
    var context2D = canvas.getContext("2d");
    //context2D.fillStyle = "#FF0000"
    //
    /*context2D.moveTo(10, 10);
    context2D.lineTo(150, 50);
    context2D.lineTo(10, 50);
    context2D.stroke();*/
    //context2D.fillText("aaa", 10, 10, 50);
    /*var image = document.createElement("img");
    image.src = "girl.jpg";
    context2D.drawImage(image, 100, 100);
    image.onload = () => {
        context2D.drawImage(image, 100, 100);
    }*/
    var stage = new DisplayObjectContainer(context2D);
    setInterval(function () {
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        stage.draw();
    }, 30);
    var textField = new TextField(); //子类都不能有参数，所以不能直接继承DisplayObject类
    textField.text = "aaa";
    textField.x = 10;
    textField.y = 10;
    textField.textColor = "#ff0000";
    var imageBitmap = new Bitmap();
    imageBitmap.name = "girl.jpg";
    //imageBitmap.width = 100;
    //imageBitmap.height = 100;
    var rect = new Shape();
    rect.drawRect(10, 10, 100, 100);
    stage.addChild(imageBitmap);
    stage.addChild(textField);
    stage.addChild(rect);
};
var DisplayObject = (function () {
    function DisplayObject(context2D) {
        this.x = 0;
        this.y = 0;
        this.context2D = context2D;
    }
    DisplayObject.prototype.draw = function (context2D) {
    };
    return DisplayObject;
}());
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
    function DisplayObjectContainer(context2D) {
        _super.call(this, context2D);
        this.childs = [];
    }
    DisplayObjectContainer.prototype.draw = function () {
        for (var _i = 0, _a = this.childs; _i < _a.length; _i++) {
            var drawable = _a[_i];
            drawable.draw(this.context2D);
        }
    };
    DisplayObjectContainer.prototype.addChild = function (child) {
        this.childs.push(child);
    };
    return DisplayObjectContainer;
}(DisplayObject));
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
        this.width = -1;
        this.height = -1;
        this.name = "";
    }
    Bitmap.prototype.draw = function () {
        var _this = this;
        var image = document.createElement("img");
        image.src = this.name;
        if (this.width == -1 && this.height == -1) {
            this.context2D.drawImage(image, this.x, this.y);
            image.onload = function () {
                _this.context2D.drawImage(image, _this.x, _this.y);
            };
        }
        else {
            this.context2D.drawImage(image, this.x, this.y, this.width, this.height);
            image.onload = function () {
                _this.context2D.drawImage(image, _this.x, _this.y, _this.width, _this.height);
            };
        }
    };
    return Bitmap;
}(DisplayObject));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
        this.text = "";
        this.textColor = "#000000";
    }
    TextField.prototype.draw = function () {
        this.toggleCase();
        this.context2D.fillStyle = this.textColor;
        this.context2D.fillText(this.text, this.x, this.y, 100);
    };
    TextField.prototype.toggleCase = function () {
        this.textColor.toLocaleUpperCase();
    };
    return TextField;
}(DisplayObject));
var Shape = (function (_super) {
    __extends(Shape, _super);
    function Shape() {
        _super.apply(this, arguments);
        this.width = 100;
        this.height = 100;
    }
    Shape.prototype.draw = function () {
    };
    Shape.prototype.drawRect = function (x, y, width, height) {
        this.context2D.fillRect(x, y, width, height);
    };
    return Shape;
}(DisplayObject));
//# sourceMappingURL=main.js.map