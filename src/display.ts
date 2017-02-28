interface Drawable {
    draw(context2D: CanvasRenderingContext2D);
}

abstract class DisplayObject implements Drawable {
    x: number = 0;
    y: number = 0;
    scaleX: number = 1;
    scaleY: number = 1;
    rotation: number = 0;

    alpha: number = 1;
    globalAlpha: number = 1;

    parent: DisplayObjectContainer;

    globalMatrix: math.Matrix = math.loadIdentityMatrix();
    localMatrix: math.Matrix = math.loadIdentityMatrix();

    touchListeners: TouchEventListener[] = [];

    draw(context2D: CanvasRenderingContext2D) {
        this.localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
        if (this.parent) {
            this.globalAlpha = this.parent.globalAlpha * this.alpha;
            this.globalMatrix = math.matrixAppendMatrix(this.localMatrix, this.parent.globalMatrix);
        } else {
            this.globalAlpha = this.alpha;
            this.globalMatrix = this.localMatrix;
        }

        context2D.globalAlpha = this.globalAlpha;
        this.globalMatrix.displayObjectSetTransform(context2D);
        this.render(context2D);
    }

    render(context2D: CanvasRenderingContext2D) {

    }

    moveTo(x: number, y: number) {
        var tempMatrix = new math.Matrix(1, 0, 0, 1, x - this.x, y - this.y);
        this.globalMatrix = math.matrixAppendMatrix(this.globalMatrix, tempMatrix);
    }

    addEventListener(type: TouchType, touchListener: Function, capture?: boolean, priority?: number) {
        var event = new TouchEventListener(type, touchListener, capture, priority);
        this.touchListeners.push(event);
    }

    abstract hitTest(x: number, y: number)
}

class DisplayObjectContainer extends DisplayObject {
    children: DisplayObject[] = [];
    constructor() {
        super();
    }
    render(context2D: CanvasRenderingContext2D) {
        for (let drawable of this.children) {
            drawable.draw(context2D);
        }
    }
    addChild(child: DisplayObject) {
        if (this.children.indexOf(child) == -1) {
            child.parent = this;
            this.children.push(child);
        }
    }
    //拷贝一个数组
    removeChild(child: DisplayObject) {
        for (var element of this.children) {
            if (element == child) {
                var index = this.children.indexOf(child);
                this.children.splice(index);
                return;
            }
        }
    }

    hitTest(x: number, y: number) {
        console.log("container");
        for (let i = this.children.length - 1; i >= 0; i--) {
            let child = this.children[i];
            let point = new math.Point(x, y);
            let invertChildLocalMatrix = math.invertMatrix(child.localMatrix);
            let pointBaseOnChild = math.pointAppendMatrix(point, child.localMatrix);
            let HitTestResult = child.hitTest(pointBaseOnChild.x, pointBaseOnChild.y);
            if (HitTestResult) {
                return HitTestResult;
            }
            else {
                return null;
            }
        }
    }

}