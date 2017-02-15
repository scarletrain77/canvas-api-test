window.onload = () => {
    var canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    var context2D = canvas.getContext("2d");
    //context2D.fillStyle = "#FF0000"
    //
    /*context2D.moveTo(10, 10);
    context2D.lineTo(150, 50);
    context2D.lineTo(10, 50);
    context2D.stroke();*/

    var stage: DisplayObjectContainer = new DisplayObjectContainer();
    //stage.setContext(context2D);
    setInterval(() => {
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        stage.draw(context2D);
    }, 30);

    var textField: TextField = new TextField();
    textField.text = "aaa";
    textField.x = 10;
    textField.y = 10;
    textField.textColor = "#ff0000"

    var imageBitmap: Bitmap = new Bitmap();
    imageBitmap.name = "girl.jpg"
    imageBitmap.x = 10;
    imageBitmap.y = 10;
    imageBitmap.width = 100;
    imageBitmap.height = 100;

    var rect: Shape = new Shape();
    rect.drawRect(10, 200, 100, 100);

    stage.addChild(imageBitmap);
    stage.addChild(textField);
    stage.addChild(rect);
    stage.draw(context2D);

};

interface Drawable {
    draw(context2D: CanvasRenderingContext2D);
}

//子类都不能有参数，所以DisplayObject的构造函数不能有参数
class DisplayObject implements Drawable {
    x: number = 0;
    y: number = 0;
    //只有一个就行
    //context2D: CanvasRenderingContext2D;
    //public static context2D: CanvasRenderingContext2D;
    constructor() {
        //DisplayObject.context2D = new CanvasRenderingContext2D();
    }

    draw(context2D: CanvasRenderingContext2D) {
    }

    /*public setContext(context2D: CanvasRenderingContext2D): void {
        //DisplayObject.context2D = context2D;
        DisplayObject.context2D = context2D;
    }

    public getContext(): CanvasRenderingContext2D {
        //return DisplayObject.context2D;
        return DisplayObject.context2D;
    }*/
}

class DisplayObjectContainer extends DisplayObject {
    childs: Drawable[] = [];
    draw(context2D: CanvasRenderingContext2D) {
        for (let drawable of this.childs) {
            //drawable.draw(DisplayObject.context2D);
            drawable.draw(context2D);
        }
    }
    addChild(child: Drawable) {
        this.childs.push(child);
    }
}

class Bitmap extends DisplayObject {
    width: number = -1;
    height: number = -1;
    name: string = "";
    draw(context2D: CanvasRenderingContext2D) {
        var image = document.createElement("img");
        image.src = this.name;
        if (this.width == -1 && this.height == -1) {
            context2D.drawImage(image, this.x, this.y);
            image.onload = () => {
                context2D.drawImage(image, this.x, this.y);
            }
        } else {
            context2D.drawImage(image, this.x, this.y, this.width, this.height);
            image.onload = () => {
                context2D.drawImage(image, this.x, this.y, this.width, this.height);
            }
        }
    }
}


class TextField extends DisplayObject {
    text: string = "";
    textColor: string = "#000000"
    draw(context2D: CanvasRenderingContext2D) {
        this.toggleCase();
        context2D.fillStyle = this.textColor;
        context2D.fillText(this.text, this.x, this.y, 100);
    }
    private toggleCase() {
        this.textColor.toLocaleUpperCase();
    }
}


class Shape extends DisplayObject {
    width: number = 100;
    height: number = 100;
    type: string = "";
    color: string = "#0000000"
    drawRect(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = "Rectangle";
    }
    draw(context2D: CanvasRenderingContext2D) {
        context2D.fillStyle = this.color;
        if (this.type == "Rectangle") {
            context2D.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}