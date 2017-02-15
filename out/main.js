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
    var stage = new DisplayObjectContainer();
    setInterval(function () {
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        stage.draw(context2D);
    }, 30);
    var textField = new TextField();
    textField.text = "aaa";
    textField.x = 10;
    textField.y = 10;
    textField.textColor = "#ff0000";
    var imageBitmap = new Bitmap();
    imageBitmap.name = "girl.jpg";
    imageBitmap.x = 50;
    imageBitmap.y = 50;
    //imageBitmap.width = 100;
    //imageBitmap.height = 100;
    stage.addChild(textField);
    stage.addChild(imageBitmap);
    //stage.addChild(shape);
};
var Bitmap = (function () {
    function Bitmap() {
        this.x = 0;
        this.y = 0;
        this.width = -1;
        this.height = -1;
        this.name = "";
    }
    Bitmap.prototype.draw = function (context2D) {
        var _this = this;
        var image = document.createElement("img");
        image.src = this.name;
        if (this.width == -1 && this.height == -1) {
            context2D.drawImage(image, this.x, this.y);
            image.onload = function () {
                context2D.drawImage(image, _this.x, _this.y);
            };
        }
        else {
            context2D.drawImage(image, this.x, this.y, this.width, this.height);
            image.onload = function () {
                context2D.drawImage(image, _this.x, _this.y, _this.width, _this.height);
            };
        }
    };
    return Bitmap;
}());
var TextField = (function () {
    function TextField() {
        this.x = 0;
        this.y = 0;
        this.text = "";
        this.textColor = "#000000";
    }
    TextField.prototype.draw = function (context2D) {
        this.toggleCase();
        context2D.fillStyle = this.textColor;
        context2D.fillText(this.text, this.x, this.y, 100);
    };
    TextField.prototype.toggleCase = function () {
        this.textColor.toLocaleUpperCase();
    };
    return TextField;
}());
var DisplayObjectContainer = (function () {
    function DisplayObjectContainer() {
        this.childs = [];
    }
    DisplayObjectContainer.prototype.draw = function (context2D) {
        for (var _i = 0, _a = this.childs; _i < _a.length; _i++) {
            var drawable = _a[_i];
            drawable.draw(context2D);
        }
    };
    DisplayObjectContainer.prototype.addChild = function (child) {
        this.childs.push(child);
    };
    return DisplayObjectContainer;
}());
var Shape = (function () {
    function Shape() {
    }
    Shape.prototype.draw = function (context2D) {
        context2D.fill();
    };
    return Shape;
}());
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle() {
        _super.apply(this, arguments);
    }
    return Rectangle;
}(Shape));
//# sourceMappingURL=main.js.map