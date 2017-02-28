var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
        this.touchListeners = [];
    }
    DisplayObject.prototype.draw = function (context2D) {
        this.localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
        if (this.parent) {
            this.globalAlpha = this.parent.globalAlpha * this.alpha;
            this.globalMatrix = math.matrixAppendMatrix(this.localMatrix, this.parent.globalMatrix);
        }
        else {
            this.globalAlpha = this.alpha;
            this.globalMatrix = this.localMatrix;
        }
        context2D.globalAlpha = this.globalAlpha;
        this.globalMatrix.displayObjectSetTransform(context2D);
        this.render(context2D);
    };
    DisplayObject.prototype.render = function (context2D) {
    };
    DisplayObject.prototype.moveTo = function (x, y) {
        var tempMatrix = new math.Matrix(1, 0, 0, 1, x - this.x, y - this.y);
        this.globalMatrix = math.matrixAppendMatrix(this.globalMatrix, tempMatrix);
    };
    DisplayObject.prototype.addEventListener = function (type, touchListener, capture, priority) {
        var event = new TouchEventListener(type, touchListener, capture, priority);
        this.touchListeners.push(event);
    };
    return DisplayObject;
}());
var DisplayObjectContainer = (function (_super) {
    __extends(DisplayObjectContainer, _super);
    function DisplayObjectContainer() {
        _super.call(this);
        this.children = [];
    }
    DisplayObjectContainer.prototype.render = function (context2D) {
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var drawable = _a[_i];
            drawable.draw(context2D);
        }
    };
    DisplayObjectContainer.prototype.addChild = function (child) {
        if (this.children.indexOf(child) == -1) {
            child.parent = this;
            this.children.push(child);
        }
    };
    //拷贝一个数组
    DisplayObjectContainer.prototype.removeChild = function (child) {
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var element = _a[_i];
            if (element == child) {
                var index = this.children.indexOf(child);
                this.children.splice(index);
                return;
            }
        }
    };
    DisplayObjectContainer.prototype.hitTest = function (x, y) {
        console.log("container");
        for (var i = this.children.length - 1; i >= 0; i--) {
            var child = this.children[i];
            var point = new math.Point(x, y);
            var invertChildLocalMatrix = math.invertMatrix(child.localMatrix);
            var pointBaseOnChild = math.pointAppendMatrix(point, child.localMatrix);
            var HitTestResult = child.hitTest(pointBaseOnChild.x, pointBaseOnChild.y);
            if (HitTestResult) {
                return HitTestResult;
            }
            else {
                return null;
            }
        }
    };
    return DisplayObjectContainer;
}(DisplayObject));
//# sourceMappingURL=display.js.map