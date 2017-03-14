namespace engine {
    export let run = (canvas: HTMLCanvasElement) => {
        var context2D = canvas.getContext("2d");
        var stage: DisplayObjectContainer = new DisplayObjectContainer();

        stage.draw(context2D);

        var curTarget;
        var staTarget;
        var isMouseDown = false;
        var staPoint = new Point(0, 0);
        var movingPoint = new Point(0, 0);
        var container = new DisplayObjectContainer();

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


        let lastNow = Date.now();
        let frameHandler = () => {
            let now = Date.now();
            let deltaTime = now - lastNow;
            Ticker.getInstance().notify(deltaTime);
            context2D.clearRect(0, 0, canvas.width, canvas.height);
            context2D.save();
            stage.draw(context2D);
            context2D.restore();
            lastNow = now;
            window.requestAnimationFrame(frameHandler);
        }

        return stage;
    }
}