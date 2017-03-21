namespace engine {

    export type Ticker_Listener_Type = (deltaTime: number) => void;

    export class Ticker {

        private static instance: Ticker;

        static getInstance() {
            if (!Ticker.instance) {
                Ticker.instance = new Ticker();
            }
            return Ticker.instance;
        }

        listeners: Ticker_Listener_Type[] = [];

        register(listener: Ticker_Listener_Type) {
            this.listeners.push(listener);
        }

        unregister(listener: Ticker_Listener_Type) {

        }

        notify(deltaTime: number) {
            for (let listener of this.listeners) {
                listener(deltaTime);
            }
        }

    }

//这里借鉴了孟彦宁的作业
    export function setTimeout(func: Function, delayTime: number){
        var ticker = Ticker.getInstance();
        var passedTime = 0;
        var delayFunc = (delta) => {
            passedTime += delta;
            if (passedTime >= delayTime) {
                func();
                //ticker.unregister(obj);
            }

        }
        ticker.register(delayFunc);
    }

}