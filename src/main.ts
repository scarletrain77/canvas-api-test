window.onload = () => {
    var canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
    var context2D = canvas.getContext("2d");
    var stage: DisplayObjectContainer = new DisplayObjectContainer();

    var textField: TextField = new TextField();
    textField.text = "aaa";
    textField.x = 10;
    textField.y = 20;
    textField.textColor = "#ff0000"
    //textField.alpha = .5;
    //textField.rotation = 180;

    var textField_2 = new TextField();
    textField_2.text = "Hello world";
    textField_2.rotation = 90;
    textField_2.textSize = 50;
    textField_2.x = 50;
    textField_2.y = 50;

    var imageBitmap: Bitmap = new Bitmap();
    imageBitmap.name = "girl.jpg"
    imageBitmap.x = 10;
    imageBitmap.y = 10;
    imageBitmap.alpha = 0.5;
    imageBitmap.rotation = 45;

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


    setInterval(() => {
        context2D.setTransform(1, 0, 0, 1, 0, 0);
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        imageBitmap.x++;
        textField_2.x++;
        textField_2.y++;
        stage.draw(context2D);
    }, 30)
};

interface Drawable {
    draw(context2D: CanvasRenderingContext2D);
}

class DisplayObject implements Drawable {
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
}

class DisplayObjectContainer extends DisplayObject {
    childs: Drawable[] = [];
    constructor() {
        super();
    }
    render(context2D: CanvasRenderingContext2D) {
        for (let drawable of this.childs) {
            drawable.draw(context2D);
        }
    }
    addChild(child: DisplayObject) {
        if (this.childs.indexOf(child) == -1) {
            child.parent = this;
            this.childs.push(child);
        }
    }
    //拷贝一个数组
    removeChild(child: Drawable) {
        for (var element of this.childs) {
            if (element == child) {
                var index = this.childs.indexOf(child);
                this.childs.splice(index);
                return;
            }
        }
    }
}
class Bitmap extends DisplayObject {
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
}

class TextField extends DisplayObject {
    text: string = "";
    textColor: string = "#000000"
    textSize = 12;
    textFont = "Calibri";
    render(context2D: CanvasRenderingContext2D) {
        context2D.fillStyle = this.textColor.toLocaleUpperCase();
        context2D.font = this.textSize.toString() + "pt " + this.textFont;
        context2D.fillText(this.text, 0, 0);
    }
}
