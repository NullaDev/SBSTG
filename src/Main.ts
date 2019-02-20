class Main extends egret.DisplayObjectContainer {
    public static readonly X = 1080;
    public static readonly Y = 1920;
    public static readonly UPPER_Y = 240;
    public static readonly BELOW_Y = 1680;

    private constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {        
        egret.lifecycle.addLifecycleListener((context) => {
            context.onUpdate = () => {}
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        this.runGame().catch(e => {
            console.log(e);
        })
        
    }

    private async runGame() {
        console.info("game start");
        await this.loadResource();
        this.addChild(MainPage.INSTANCE);
        //await platform.login();
        //const userInfo = await platform.getUserInfo();
        //console.log(userInfo);
    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

}