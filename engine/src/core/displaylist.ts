namespace engine {
    export interface Drawable {
        draw(context2D: CanvasRenderingContext2D);
    }

    export abstract class DisplayObject implements Drawable {
        x: number = 0;
        y: number = 0;
        scaleX: number = 1;
        scaleY: number = 1;
        rotation: number = 0;

        alpha: number = 1;
        globalAlpha: number = 1;

        parent: DisplayObjectContainer;

        globalMatrix: Matrix = loadIdentityMatrix();
        localMatrix: Matrix = loadIdentityMatrix();

        isMouseDown = false;
        touchListeners: TouchEvents[] = [];

        draw(context2D: CanvasRenderingContext2D) {
            this.localMatrix.updateFromDisplayObject(this.x, this.y, this.scaleX, this.scaleY, this.rotation);
            if (this.parent) {
                this.globalAlpha = this.parent.globalAlpha * this.alpha;
                this.globalMatrix = matrixAppendMatrix(this.localMatrix, this.parent.globalMatrix);
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
            var tempMatrix = new Matrix(1, 0, 0, 1, x - this.x, y - this.y);
            this.globalMatrix = matrixAppendMatrix(this.globalMatrix, tempMatrix);
        }

        addEventListener(type: TouchEventsType, touchListener: Function, obj: any, capture?: boolean, priority?: number) {
            var event = new TouchEvents(type, touchListener, obj, capture, priority);
            this.touchListeners.push(event);
        }

        dispatchEvent(e: any) {
            console.log(e.type);
            if (e.type == "mousedown") {
                this.isMouseDown = true;
            } else if (e.type == "mouseup" && this.isMouseDown == true) {//other types unfinish
                for (let i = 0; i < this.touchListeners.length; i++) {
                    if (this.touchListeners[i].type == TouchEventsType.CLICK) {
                        this.touchListeners[i].func();
                    }
                }
                this.isMouseDown = false;
            } else if (e.type == "mousemove") {

            }
        }

        abstract hitTest(x: number, y: number)
    }

    export class DisplayObjectContainer extends DisplayObject {
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
            for (let i = this.children.length - 1; i >= 0; i--) {
                var child = this.children[i];
                var pointBaseOnChild = pointAppendMatrix(new Point(x, y), invertMatrix(child.globalMatrix));
                var hitTestResult = child.hitTest(pointBaseOnChild.x, pointBaseOnChild.y);
                if (hitTestResult) {
                    return hitTestResult;
                }
            }
            return null;
        }

    }

    export class Bitmap extends DisplayObject {
        width: number = -1;
        height: number = -1;
        name: string = "";
        private image: HTMLImageElement = null;
        private isLoaded = false;
        constructor() {
            super();
            this.image = document.createElement("img");
        }
        render(context2D: CanvasRenderingContext2D) {
            if (this.isLoaded) {
                context2D.drawImage(this.image, 0, 0);
            } else {
                this.image.src = this.name;
                this.image.onload = () => {
                    context2D.drawImage(this.image, 0, 0, this.width, this.height);
                    this.isLoaded = true;
                }
            }
        }


        hitTest(x: number, y: number) {
            console.log("bitmap");
            let rect = new Rectangle();
            rect.x = rect.y = 0;
            if (this.height == -1 && this.width == -1) {
                rect.width = this.image.width;
                rect.height = this.image.height;
            } else {
                rect.width = this.width;
                rect.height = this.height;
            }
            if (rect.isPointInReactangle(new Point(x, y))) {
                return this;
            }
            return null;
        }
    }

    export class TextField extends DisplayObject {
        text: string = "";
        textColor: string = "#000000"
        textSize = 12;
        textFont = "Calibri";
        render(context2D: CanvasRenderingContext2D) {
            context2D.fillStyle = this.textColor.toLocaleUpperCase();
            context2D.font = this.textSize.toString() + "pt " + this.textFont;
            context2D.fillText(this.text, 0, 0);
        }
        hitTest(x: number, y: number) {
            var rect = new Rectangle();
            var point = new Point(x, y);
            rect.x = 0;
            rect.y = 0;
            rect.width = this.textSize * this.text.length;
            rect.height = this.textSize;
            let invertChildLocalMatrix = invertMatrix(this.localMatrix);
            let pointBaseOnChild = pointAppendMatrix(new Point(x, y), invertChildLocalMatrix);
            return rect.isPointInReactangle(pointBaseOnChild)
        }
    }
}