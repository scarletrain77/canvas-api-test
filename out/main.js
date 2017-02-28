var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
    textField_2.rotation = 90;
    textField_2.textSize = 50;
    textField_2.x = 50;
    textField_2.y = 50;
    var imageBitmap = new Bitmap();
    imageBitmap.name = "girl.jpg";
    imageBitmap.x = 10;
    imageBitmap.y = 10;
    imageBitmap.alpha = 0.5;
    imageBitmap.rotation = 45;
    textField.addEventListener(TouchType.CLICK, function () {
        alert("click");
    });
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
        imageBitmap.x++;
        textField_2.x++;
        textField_2.y++;
        stage.draw(context2D);
    }, 30);
    window.onmousedown = function (e) {
        var x = e.offsetX - 3;
        var y = e.offsetY - 3;
        var result = stage.hitTest(x, y);
        var target = result;
        console.log(result);
        if (result) {
            do {
                result.dispatchEvent(e);
            } while (result.parent);
            {
                var type = "onmousedown";
                var currentTarget = result.parent;
                var e_1 = { type: type, target: target, currentTarget: currentTarget };
                result.dispatchEvent(e_1);
                result = result.parent;
            }
        }
    };
    window.onmouseup = function (e) {
        var x = e.offsetX - 3;
        var y = e.offsetY - 3;
        var result = stage.hitTest(x, y);
        var target = result;
        console.log(result);
        if (result) {
            do {
                result.dispatchEvent(e);
            } while (result.parent);
            {
                var type = "onmouseup";
                var currentTarget = result.parent;
                var e_2 = { type: type, target: target, currentTarget: currentTarget };
                result.dispatchEvent(e_2);
                result = result.parent;
            }
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
        rect.width = this.image.width;
        rect.height = this.image.height;
        if (rect.isPointInReactangle(new math.Point(x, y))) {
            alert("touch");
            return this;
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
        this.textSize = 12;
        this.textFont = "Calibri";
    }
    TextField.prototype.render = function (context2D) {
        context2D.fillStyle = this.textColor.toLocaleUpperCase();
        context2D.font = this.textSize.toString() + "pt " + this.textFont;
        context2D.fillText(this.text, 0, 0);
    };
    TextField.prototype.hitTest = function (x, y) {
        console.log("textfield");
        var rect = new math.Rectangle();
        rect.height = 20;
        rect.width = 10 * this.text.length;
        var point = new math.Point(x, y);
        return rect.isPointInReactangle(point) ? this : null;
    };
    return TextField;
}(DisplayObject));
//# sourceMappingURL=main.js.map