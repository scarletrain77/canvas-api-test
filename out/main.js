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
    var stage = new DisplayObjectContainer();
    //stage.setContext(context2D);
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
    imageBitmap.x = 10;
    imageBitmap.y = 10;
    imageBitmap.width = 100;
    imageBitmap.height = 100;
    var rect = new Shape();
    rect.drawRect(10, 200, 100, 100);
    stage.addChild(imageBitmap);
    stage.addChild(textField);
    stage.addChild(rect);
    stage.draw(context2D);
};
//子类都不能有参数，所以DisplayObject的构造函数不能有参数
var DisplayObject = (function () {
    //只有一个就行
    //context2D: CanvasRenderingContext2D;
    //public static context2D: CanvasRenderingContext2D;
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        //DisplayObject.context2D = new CanvasRenderingContext2D();
    }
    DisplayObject.prototype.draw = function (context2D) {
    };
    return DisplayObject;
}());
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
    function DisplayObjectContainer() {
        _super.apply(this, arguments);
        this.childs = [];
    }
    DisplayObjectContainer.prototype.draw = function (context2D) {
        for (var _i = 0, _a = this.childs; _i < _a.length; _i++) {
            var drawable = _a[_i];
            //drawable.draw(DisplayObject.context2D);
            drawable.draw(context2D);
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
}(DisplayObject));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
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
}(DisplayObject));
var Shape = (function (_super) {
    __extends(Shape, _super);
    function Shape() {
        _super.apply(this, arguments);
        this.width = 100;
        this.height = 100;
        this.type = "";
        this.color = "#0000000";
    }
    Shape.prototype.drawRect = function (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = "Rectangle";
    };
    Shape.prototype.draw = function (context2D) {
        context2D.fillStyle = this.color;
        if (this.type == "Rectangle") {
            context2D.fillRect(this.x, this.y, this.width, this.height);
        }
    };
    return Shape;
}(DisplayObject));
//# sourceMappingURL=main.js.map