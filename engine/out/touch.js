var TouchEventsType;
(function (TouchEventsType) {
    TouchEventsType[TouchEventsType["MOUSEDOWN"] = 0] = "MOUSEDOWN";
    TouchEventsType[TouchEventsType["MOUSEUP"] = 1] = "MOUSEUP";
    TouchEventsType[TouchEventsType["CLICK"] = 2] = "CLICK";
    TouchEventsType[TouchEventsType["MOUSEMOVE"] = 3] = "MOUSEMOVE";
})(TouchEventsType || (TouchEventsType = {}));
var TouchEvents = (function () {
    function TouchEvents(type, func, obj, capture, priority) {
        this.capture = false;
        this.priority = 0;
        this.type = type;
        this.func = func;
        this.obj = obj;
        this.capture = capture || false;
        this.priority = priority || 0;
    }
    return TouchEvents;
}());
var TouchEventService = (function () {
    function TouchEventService() {
        this.performerList = [];
    }
    TouchEventService.getInstance = function () {
        if (TouchEventService.instance == null) {
            TouchEventService.instance = new TouchEventService();
        }
        return this.instance;
    };
    TouchEventService.prototype.addPerformer = function (performer) {
        this.performerList.push(performer);
    };
    TouchEventService.prototype.clearList = function () {
        this.performerList.splice(0, this.performerList.length);
    };
    TouchEventService.prototype.toDo = function () {
        for (var i = 0; i <= this.performerList.length - 1; i++) {
            for (var _i = 0, _a = this.performerList[i].touchListeners; _i < _a.length; _i++) {
                var listner = _a[_i];
                if (listner.type == TouchEventService.currentType) {
                    if (listner.capture) {
                        listner.func();
                        continue;
                    }
                }
            }
        }
        for (var i = this.performerList.length - 1; i >= 0; i--) {
            for (var _b = 0, _c = this.performerList[i].touchListeners; _b < _c.length; _b++) {
                var listner = _c[_b];
                if (listner.type == TouchEventService.currentType) {
                    if (!listner.capture) {
                        listner.func();
                        continue;
                    }
                }
            }
        }
        this.clearList();
    };
    TouchEventService.stageX = -1;
    TouchEventService.stageY = -1;
    return TouchEventService;
}());
//# sourceMappingURL=touch.js.map