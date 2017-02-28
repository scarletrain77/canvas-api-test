enum TouchType {
    MOUSEDOWN,
    MOUSEUP,
    CLICK,
    MOUSEMOVE
}

class TouchEventListener {
    type: TouchType;
    func: Function;
    capture = false;
    priority = 0;

    constructor(type: TouchType, func: Function, capture?: boolean, priority?: number) {
        this.type = type;
        this.func = func;
        this.capture = capture || false;
        this.priority = priority || 0;
    }
}

class TouchEvents {
    x: number;
    y: number;
    type: TouchType;

    constructor(x: number, y: number, type: TouchType) {
        this.x = x;
        this.y = y;
        this.type = type;
    }
}