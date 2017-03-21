namespace engine {
    export enum TouchEventsType {
        MOUSEDOWN,
        MOUSEUP,
        CLICK,
        MOUSEMOVE,
        TOUCH_TAP
    }

    export class TouchEventService {
        //private _performerList: DisplayObject[] = [];
        performerList:DisplayObject[] = [];
        public static instance: TouchEventService;
        public static getInstance() {
            if (TouchEventService.instance == null) {
                TouchEventService.instance = new TouchEventService();
                //this.performerList = new Array<DisplayObject>();
                return TouchEventService.instance;
            } else {
                return TouchEventService.instance;
            }
        }

        /*addPerformer(performer: DisplayObject){
            this._performerList.push(performer);
        }

        splicePerformer(staNum: number, endNum: number){
            this._performerList.splice(staNum, endNum);
        }*/

        /*get performerList(){
            return this._performerList;
        }*/
    }

    export class TouchEvents {
        type = TouchEventsType.CLICK;
        func: Function;
        target: DisplayObject;
        capture = false;
        
        constructor(type: TouchEventsType, func: Function, target: DisplayObject, capture: boolean) {
            this.type = type;
            this.func = func;
            this.target = target;
            this.capture = capture || false;
        }
    }


    /*export class TouchEventService {
        private static instance;
        private performerList: DisplayObject[] = [];
        static currentType: TouchEventsType;
        static stageX = -1;
        static stageY = -1;
        static getInstance(): TouchEventService {
            if (TouchEventService.instance == null) {
                TouchEventService.instance = new TouchEventService();
            }
            return this.instance;
        }

        addPerformer(performer: DisplayObject) {
            this.performerList.push(performer);
        }

        clearList() {
            this.performerList.splice(0, this.performerList.length);
        }

        toDo() {
            for (var i = 0; i <= this.performerList.length - 1; i++) {
                for (var listner of this.performerList[i].touchListeners) {
                    if (listner.type == TouchEventService.currentType) {
                        if (listner.capture) {
                            listner.func();
                            continue;
                        }
                    }
                }
            }

            for (var i = this.performerList.length - 1; i >= 0; i--) {
                for (var listner of this.performerList[i].touchListeners) {
                    if (listner.type == TouchEventService.currentType) {
                        if (!listner.capture) {
                            listner.func();
                            continue;
                        }
                    }
                }
            }
            this.clearList();
        }
    }*/
}

