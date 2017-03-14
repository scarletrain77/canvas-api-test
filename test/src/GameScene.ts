class GameScene extends egret.DisplayObjectContainer {
    private static _scene: GameScene;
    private _userSystem: UserSystem;
    //private _taskSystem: TaskSystem;

    constructor() {
        super();
        //this._tileMap = new TileMap();
        this._userSystem = new UserSystem();
        //this._taskSystem = new TaskSystem();
        this.addChild(this._userSystem);
        //this.addChild(this._taskSystem);
        //this.addChild(this._userSystem);
    }

    public static replaceScene(scene: GameScene) {
        GameScene._scene = scene;
    }

    public static getCurrentScene(): GameScene {
        return GameScene._scene;
    }

    public moveTo(x: number, y: number, callback: Function) {
        console.log("开始移动")
        this._userSystem.tileMap.moveTo(x, y);
        egret.setTimeout(function () {
            console.log("结束移动")
            callback();
        }, this, 1000)
    }

    public stopMove(callback: Function) {
        console.log("取消移动")
        callback();
    }

    public beginTalk(callback: Function) {
        console.log("开始谈话")
        UserSystem.currentNPC.onClick();
        egret.setTimeout(function () {
            console.log("结束谈话")
            callback();
        }, this, 1000)
    }

    public fight(callback: Function) {
        console.log("开始攻击")
        this._userSystem.monster.onClick();
        egret.setTimeout(function () {
            console.log("结束攻击")
            callback();
        }, this, 1000)
    }

    public getEquipment(callback: Function) {
        console.log("开始拾取")
        this._userSystem.equipmentButton.onClick();
        egret.setTimeout(function () {
            console.log("结束拾取")
            callback();
        }, this, 1000)
    }


    public get userSystem(): UserSystem {
        return this._userSystem;
    }
}