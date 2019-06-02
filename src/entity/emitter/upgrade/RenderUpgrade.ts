class RenderUpgrade extends EmitterUpgradeBase {

    protected _texture_width:number;
	protected _texture_height:number
    protected _texture:string;
	protected _img:egret.Bitmap;

	/** 
	 * 构造一个发射器渲染升级。
	 * 需要setParentEmitter。
	 * 需要renderOnStage。
	 * @param size 发射器图片大小
	 * @param texture 发射器图片材质
	 */
	public constructor(texture:string, width:number, height:number) {
		super();
        this._texture_width = width;
		this._texture_height = height;
        this._texture = texture;
		this._freq = 1000;
		this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAddToStage,this);
	}

	protected onAddToStage(event:egret.Event) {
        this.doRender();
    }

	protected doRender() {
		this.x = this._parent_emitter.x;
		this.y = this._parent_emitter.y;
		this._img = MyUtils.createBitmapByName(this._texture);
        this._img.width = this._texture_width;
        this._img.height = this._texture_height;
        this._img.anchorOffsetX = this._img.width/2;
        this._img.anchorOffsetY = this._img.height/2;
		this._img.x = 0;
		this._img.y = 0;
        this.addChild(this._img);
	}

	public setDead() {
		this.removeChildren();
		this.parent.removeChild(this);
        super.setDead();
    }

	public setTexture(texture:string) {
		this._texture = texture;
		return this;
	}

	/**
	 * 等上级发射器停止后，移动到上级发射器应该在的地方。这样会使上级发射器多停止一次，但问题不大。
	 */
	public stop() {
		super.stop();
		this._parent_emitter.stop();
		this.x = this._parent_emitter.x;
		this.y = this._parent_emitter.y;
	}

	public renderOnStage(stage:StageBase) {
		stage.addChildAtLayer(this, DrawingLayer.EMITTER);
		return this;
	}

}