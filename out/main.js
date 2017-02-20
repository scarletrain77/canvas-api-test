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
    textField.alpha = 1;
    var imageBitmap = new Bitmap();
    imageBitmap.name = "girl.jpg";
    imageBitmap.x = 10;
    imageBitmap.y = 10;
    imageBitmap.alpha = 1;
    //imageBitmap.moveTo(100, 100);
    //单位矩阵
    //context2D.setTransform(1, 0, 0, 1, 1, 1);
    //a, b,c, d, tx, ty
    //a:x坐标放大倍数，d:y坐标放大倍数, tx向右平移， ty向下平移
    /*var m = math.loadIdentityMatrix();
    var m1 = new math.Matrix(1, 0, 0, 1, 1, 100);
    var m2 = math.matrixAppendMatrix(m , m1);
    m1.displayObjectSetTransform(context2D);*/
    //context2D.setTransform(1, 0, 0, 1, 1, 1)
    stage.addChild(imageBitmap);
    stage.addChild(textField);
    stage.alpha = 0.5;
    stage.draw(context2D);
    setInterval(function () {
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        textField.x++;
        stage.draw(context2D);
    }, 30);
};
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        this.rotation = 0;
        this.alpha = 1;
        this.globalAlpha = 1;
        this.globalMatrix = math.loadIdentityMatrix();
        this.localMatrix = math.loadIdentityMatrix();
        this.localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
        if (this.parent) {
            this.globalMatrix = math.matrixAppendMatrix(this.localMatrix, this.parent.globalMatrix);
        }
        else {
            this.globalMatrix = this.localMatrix;
        }
    }
    DisplayObject.prototype.draw = function (context2D) {
        //this.localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
        if (this.parent) {
            this.globalAlpha = this.parent.globalAlpha * this.alpha;
        }
        else {
            this.globalAlpha = this.alpha;
        }
        context2D.globalAlpha = this.globalAlpha;
        this.globalMatrix.displayObjectSetTransform(context2D);
        this.render(context2D);
    };
    DisplayObject.prototype.render = function (context2D) {
    };
    return DisplayObject;
}());
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
    function DisplayObjectContainer() {
        _super.call(this);
        this.childs = [];
    }
    DisplayObjectContainer.prototype.render = function (context2D) {
        for (var _i = 0, _a = this.childs; _i < _a.length; _i++) {
            var drawable = _a[_i];
            drawable.draw(context2D);
        }
    };
    DisplayObjectContainer.prototype.addChild = function (child) {
        if (this.childs.indexOf(child) == -1) {
            child.parent = this;
            this.childs.push(child);
        }
    };
    //拷贝一个数组
    DisplayObjectContainer.prototype.removeChild = function (child) {
        for (var _i = 0, _a = this.childs; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element == child) {
                var index = this.childs.indexOf(child);
                this.childs.splice(index);
                return;
            }
        }
    };
    return DisplayObjectContainer;
}(DisplayObject));
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
        context2D.globalAlpha = this.globalAlpha;
        if (this.isLoaded) {
            context2D.drawImage(this.image, this.x, this.y);
        }
        else {
            this.image.src = this.name;
            this.image.onload = function () {
                context2D.drawImage(_this.image, _this.x, _this.y, _this.width, _this.height);
                _this.isLoaded = true;
            };
        }
    };
    Bitmap.prototype.moveTo = function (x, y) {
        var tempMatrix = new math.Matrix(1, 0, 0, 1, x - this.x, y - this.y);
        this.globalMatrix = math.matrixAppendMatrix(this.globalMatrix, tempMatrix);
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
        context2D.globalAlpha = this.globalAlpha;
        context2D.font = this.textSize.toString() + "pt " + this.textFont;
        context2D.fillText(this.text, this.x, this.y);
    };
    return TextField;
}(DisplayObject));
//# sourceMappingURL=main.js.map