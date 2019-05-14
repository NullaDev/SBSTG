class Pause extends Popup {

	public static readonly INSTANCE:Pause = new Pause();

	private _img:egret.Bitmap;

	private btnResume:Button;
	private btnReturn:Button;
    private btnRestart:Button;

	protected constructor() {
        super("pause_popup");
    }

    protected doRender() {
        super.doRender();
		this._img = MyUtils.createBitmapByName(TextureNames.POPUP_PAUSE);
        this._img.width = 600;
        this._img.height = 600;
        this._img.anchorOffsetX = this._img.width/2;
        this._img.anchorOffsetY = this._img.height/2;
        this._img.x = Main.X/2;
        this._img.y = Main.Y/2;
        this.addChild(this._img);

		this.btnResume = new Button(120, 120, new egret.Point(360, 1140), TextureNames.BUTTON_RESUME);
        this.btnResume.setAction(Pause.click_resume);
        this.addChild(this.btnResume);

		this.btnRestart = new Button(120, 120, new egret.Point(540, 1140), TextureNames.BUTTON_RESTART);
        this.btnRestart.setAction(Pause.click_restart);
        this.addChild(this.btnRestart);

		this.btnReturn = new Button(120, 120, new egret.Point(720, 1140), TextureNames.BUTTON_RETURN);
        this.btnReturn.setAction(Pause.click_return);
        this.addChild(this.btnReturn);
        
    }

	public static click_resume(evt:egret.TouchEvent) {
        Pause.INSTANCE.removeChildren();
		Main.getMain().removeChild(Pause.INSTANCE);
		let current = SelfMachine.INSTANCE.currentStage;
		current.resume();
    }

	public static click_return(evt:egret.TouchEvent) {
        let current = SelfMachine.INSTANCE.currentStage;
        current.end();
        Pause.INSTANCE.removeChildren();
        Main.getMain().removeChildren();
        Main.getMain().addChild(PageMain.INSTANCE);
    }

	public static click_restart(evt:egret.TouchEvent) {
        Pause.INSTANCE.removeChildren();
		Main.getMain().removeChild(Pause.INSTANCE);
		let current = SelfMachine.INSTANCE.currentStage;
		current.restart();
	}

}