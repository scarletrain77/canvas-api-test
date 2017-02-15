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


    var stage: DisplayObjectContainer = new DisplayObjectContainer();
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
    imageBitmap.x = 50;
    imageBitmap.y = 50;
    //imageBitmap.width = 100;
    //imageBitmap.height = 100;

    stage.addChild(textField);
    stage.addChild(imageBitmap);
    //stage.addChild(shape);

};

interface Drawable {
    draw(context2D: CanvasRenderingContext2D);
}




class Bitmap implements Drawable {
    x: number = 0;
    y: number = 0;
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

class TextField implements Drawable {
    x: number = 0;
    y: number = 0;
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

class DisplayObjectContainer implements Drawable {
    childs: Drawable[] = [];
    draw(context2D: CanvasRenderingContext2D) {
        for (let drawable of this.childs) {
            drawable.draw(context2D);
        }
    }
    addChild(child: Drawable) {
        this.childs.push(child);
    }

}

class Shape implements Drawable {
    draw(context2D: CanvasRenderingContext2D) {
        context2D.fill();
    }
}

class Rectangle extends Shape {

}