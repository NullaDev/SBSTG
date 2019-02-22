class PageChooseStage extends PageBase {

    public static readonly INSTANCE:PageChooseStage = new PageChooseStage();

    private btnStage1:Button;
    private btnStage2:Button;

    protected constructor() {
        super("choose_stage");
    }

    protected onAddToStage(event:egret.Event) {
        super.onAddToStage(event);
    }

    protected doRender() {
        let sky = MyUtils.createBitmapByName("main_page_png");
        sky.width = this.stage.stageWidth;
        sky.height = this.stage.stageHeight;
        sky.alpha = 1;
        this.addChild(sky);

        this.btnStage1 = new Button(320, 100, new egret.Point(this.stage.stageWidth * 0.5, this.stage.stageHeight * 0.3), "btn_stage1");
        this.btnStage1.setAction(this.onClickStage1);
        this.addChild(this.btnStage1);

        this.btnStage2 = new Button(320, 100, new egret.Point(this.stage.stageWidth * 0.5, this.stage.stageHeight * 0.6), "btn_stage2");
        this.btnStage2.setAction(this.onClickStage2);
        this.addChild(this.btnStage2);
    }

    protected onClickStage1() {
        this.parent.addChild(Stage1.INSTANCE);
        this.parent.removeChild(this);
    }

     protected onClickStage2() {
        this.parent.addChild(Stage2.INSTANCE);
        this.parent.removeChild(this);
    }
    
}