namespace engine {
    export type Ticker_listener_Type = (deltaTime: number) => void;

    export class Ticker {
        static instance: Ticker;

        static getInstance() {
            if (!Ticker.instance) {
                Ticker.instance = new Ticker();
            }
            return Ticker.instance;
        }

        listeners: Ticker_listener_Type[] = [];

        register(listener: (deltaTime: number) => void) {
            this.listeners.push(listener);
        }

        unregister(listener: (deltaTime: number) => void) {

        }
        notify(deltaTime: number) {
            for (let listener of this.listeners) {
                listener(deltaTime);
            }
        }
    }
}