var TouchType;
(function (TouchType) {
    TouchType[TouchType["MOUSEDOWN"] = 0] = "MOUSEDOWN";
    TouchType[TouchType["MOUSEUP"] = 1] = "MOUSEUP";
    TouchType[TouchType["CLICK"] = 2] = "CLICK";
    TouchType[TouchType["MOUSEMOVE"] = 3] = "MOUSEMOVE";
})(TouchType || (TouchType = {}));
var TouchEventListener = (function () {
    function TouchEventListener(type, func, capture, priority) {
        this.capture = false;
        this.priority = 0;
        this.type = type;
        this.func = func;
        this.capture = capture || false;
        this.priority = priority || 0;
    }
    return TouchEventListener;
}());
//# sourceMappingURL=touch.js.map