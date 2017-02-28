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

    textField.addEventListener(TouchType.CLICK, () => {
        alert("click");
    });

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

    window.onmousedown = (e) => {
        let x = e.offsetX - 3;
        let y = e.offsetY - 3;
        let result = stage.hitTest(x, y);
        let target = result;
        console.log(result)
        if (result) {
            do {
                result.dispatchEvent(e);
            }
            while (result.parent) {
                let type = "onmousedown";
                let currentTarget = result.parent;
                let e = { type, target, currentTarget };
                result.dispatchEvent(e);
                result = result.parent;
            }
        }
    }

    window.onmouseup = (e) => {
        let x = e.offsetX - 3;
        let y = e.offsetY - 3;
        let result = stage.hitTest(x, y);
        let target = result;
        console.log(result)
        if (result) {
            do {
                result.dispatchEvent(e);
            }
            while (result.parent) {
                let type = "onmouseup";
                let currentTarget = result.parent;
                let e = { type, target, currentTarget };
                result.dispatchEvent(e);
                result = result.parent;
            }
        }
    }
};


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


    hitTest(x: number, y: number) {
        console.log("bitmap");
        let rect = new math.Rectangle();
        rect.x = rect.y = 0;
        rect.width = this.image.width;
        rect.height = this.image.height;
        if (rect.isPointInReactangle(new math.Point(x, y))) {
            alert("touch");
            return this;
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
    hitTest(x: number, y: number) {
        console.log("textfield");
        var rect = new math.Rectangle();
        rect.height = 20;
        rect.width = 10 * this.text.length;
        var point = new math.Point(x, y);
        return rect.isPointInReactangle(point) ? this : null;

    }
}
