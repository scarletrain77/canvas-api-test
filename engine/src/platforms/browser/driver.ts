namespace engine {
    export let run = (canvas: HTMLCanvasElement) => {
        var context2D = canvas.getContext("2d");
        var stage: DisplayObjectContainer = new DisplayObjectContainer();

        stage.draw(context2D);

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