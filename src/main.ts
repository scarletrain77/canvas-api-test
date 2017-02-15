window.onload = () => {
    var canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    var context2D = canvas.getContext("2d");
    //context2D.fillStyle = "#FF0000"
    //
    /*context2D.moveTo(10, 10);
    context2D.lineTo(150, 50);
    context2D.lineTo(10, 50);
    context2D.stroke();*/

    //context2D.fillText("aaa", 10, 10, 50);

    /*var image = document.createElement("img");
    image.src = "girl.jpg";
    context2D.drawImage(image, 100, 100);
    image.onload = () => {
        context2D.drawImage(image, 100, 100);
    }*/


    var stage: DisplayObjectContainer = new DisplayObjectContainer(context2D);
    setInterval(() => {
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        stage.draw();
    }, 30);

    var textField: TextField = new TextField();//子类都不能有参数，所以不能直接继承DisplayObject类
    textField.text = "aaa";
    textField.x = 10;
    textField.y = 10;
    textField.textColor = "#ff0000"

    var imageBitmap: Bitmap = new Bitmap();
    imageBitmap.name = "girl.jpg"
    //imageBitmap.width = 100;
    //imageBitmap.height = 100;

    var rect: Shape = new Shape();
    rect.drawRect(10, 10, 100, 100);

    stage.addChild(imageBitmap);
    stage.addChild(textField);
    stage.addChild(rect);

};

interface Drawable {
    draw(context2D: CanvasRenderingContext2D);
}

class DisplayObject implements Drawable {
    x: number = 0;
    y: number = 0;
    context2D: CanvasRenderingContext2D;
    constructor(context2D: CanvasRenderingContext2D) {
        this.context2D = context2D;
    }
    draw(context2D: CanvasRenderingContext2D) {
    }
}

class DisplayObjectContainer extends DisplayObject {
    childs: Drawable[] = [];
    constructor(context2D: CanvasRenderingContext2D) {
        super(context2D);
    }
    draw() {
        for (let drawable of this.childs) {
            drawable.draw(this.context2D);
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
    draw() {
        var image = document.createElement("img");
        image.src = this.name;
        if (this.width == -1 && this.height == -1) {
            this.context2D.drawImage(image, this.x, this.y);
            image.onload = () => {
                this.context2D.drawImage(image, this.x, this.y);
            }
        } else {
            this.context2D.drawImage(image, this.x, this.y, this.width, this.height);
            image.onload = () => {
                this.context2D.drawImage(image, this.x, this.y, this.width, this.height);
            }
        }
    }
}


class TextField extends DisplayObject {
    text: string = "";
    textColor: string = "#000000"
    draw() {
        this.toggleCase();
        this.context2D.fillStyle = this.textColor;
        this.context2D.fillText(this.text, this.x, this.y, 100);
    }
    private toggleCase() {
        this.textColor.toLocaleUpperCase();
    }
}


class Shape extends DisplayObject {
    width: number = 100;
    height: number = 100;
    draw() {
    }

    drawRect(x: number, y: number, width: number, height: number) {
        this.context2D.fillRect(x, y, width, height);
    }
}