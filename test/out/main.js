/*window.onload = () => {
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
    //textField_2.rotation = 90;
    textField_2.textSize = 50;
    textField_2.x = 50;
    textField_2.y = 50;

    var imageBitmap: Bitmap = new Bitmap();
    imageBitmap.name = "girl.jpg"
    imageBitmap.x = 10;
    imageBitmap.y = 30;
    //imageBitmap.alpha = 0.5;
    //imageBitmap.rotation = 45;

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
        stage.draw(context2D);
    }, 30)

    var curTarget;
    var staTarget;
    var isMouseDown = false;
    var staPoint = new math.Point(0, 0);
    var movingPoint = new math.Point(0, 0);
    var container = new DisplayObjectContainer();

    textField.addEventListener(TouchEventsType.MOUSEMOVE, () => {
        if (curTarget == staTarget) {
            container.x += (TouchEventService.stageX - movingPoint.x);
            container.y += (TouchEventService.stageY - movingPoint.y);
            alert("listhhh");
        }
    }, this);

    textField_2.addEventListener(TouchEventsType.CLICK, () => {
        alert("You have click!");
        console.log("button");
    }, this);

    window.onmousedown = (e) => {
        let x = e.offsetX;
        let y = e.offsetY;
        TouchEventService.stageX = x;
        TouchEventService.stageY = y;
        staPoint.x = x;
        staPoint.y = y;
        movingPoint.x = x;
        movingPoint.y = y;
        TouchEventService.currentType = TouchEventsType.MOUSEDOWN;
        curTarget = stage.hitTest(x, y);
        staTarget = curTarget;
        TouchEventService.getInstance().toDo();
        isMouseDown = true;
    }

    window.onmouseup = (e) => {
        let x = e.offsetX;
        let y = e.offsetY;
        TouchEventService.stageX = x;
        TouchEventService.stageY = y;
        var target = stage.hitTest(x, y);
        if (target == curTarget) {
            TouchEventService.currentType = TouchEventsType.CLICK;
        }
        else {
            TouchEventService.currentType = TouchEventsType.MOUSEUP
        }
        TouchEventService.getInstance().toDo();
        curTarget = null;
        isMouseDown = false;
    }

    window.onmousemove = (e) => {
        if (isMouseDown) {
            let x = e.offsetX;
            let y = e.offsetY;
            TouchEventService.stageX = x;
            TouchEventService.stageY = y;
            TouchEventService.currentType = TouchEventsType.MOUSEMOVE;
            curTarget = stage.hitTest(x, y);
            TouchEventService.getInstance().toDo();
            movingPoint.x = x;
            movingPoint.y = y;
        }
    }
};


*/ 
