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
    var stage = new DisplayObjectContainer();
    setInterval(function () {
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        stage.draw(context2D);
    }, 30);
    var textField = new TextField();
    textField.text = "aaa";
    textField.x = 10;
    textField.y = 10;
    textField.color = "#ff0000";
    stage.addChild(textField);
    //stage.addChild(shape);
};
var Bitmap = (function () {
    function Bitmap() {
        this.x = 0;
        this.y = 0;
        this.name = "";
    }
    Bitmap.prototype.draw = function (context2D) {
        var image = new Image();
        image.src = this.name;
        context2D.drawImage(image, this.x, this.y);
    };
    return Bitmap;
}());
var TextField = (function () {
    function TextField() {
        this.x = 0;
        this.y = 0;
        this.text = "";
        this.color = "#000000";
    }
    TextField.prototype.draw = function (context2D) {
        this.toggleCase();
        context2D.fillStyle = this.color;
        context2D.fillText(this.text, this.x, this.y, 100);
    };
    TextField.prototype.toggleCase = function () {
        this.color.toLocaleUpperCase();
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