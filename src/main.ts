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

    var stage: DisplayObjectContainer = new DisplayObjectContainer();
    setInterval(() => {
        context2D.clearRect(0, 0, canvas.width, canvas.height);
        stage.draw(context2D);
    }, 30);

    var textField: TextField = new TextField();
    textField.text = "aaa";
    textField.x = 10;
    textField.y = 10;
    textField.color = "#ff0000"
    stage.addChild(textField);
    //stage.addChild(shape);


};

interface Drawable {
    draw(context2D: CanvasRenderingContext2D);
}




class Bitmap implements Drawable {
    x: number = 0;
    y: number = 0;
    name: string = "";
    draw(context2D: CanvasRenderingContext2D) {
        var image = new Image();
        image.src = this.name;
        context2D.drawImage(image, this.x, this.y);
    }
}

class TextField implements Drawable {
    x: number = 0;
    y: number = 0;
    text: string = "";
    color: string = "#000000"
    draw(context2D: CanvasRenderingContext2D) {
        this.toggleCase();
        context2D.fillStyle = this.color;
        context2D.fillText(this.text, this.x, this.y, 100);
    }

    private toggleCase() {
        this.color.toLocaleUpperCase();
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