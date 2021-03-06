class PageDeveloperWords extends PageBase {

    public static readonly INSTANCE:PageDeveloperWords = new PageDeveloperWords();

	protected titleText:egret.TextField;
	protected contentText:egret.TextField;

    protected onAddToStage(event:egret.Event) {
        super.onAddToStage(event);
    }

    protected doRender() {
        let sky = MyUtils.createBitmapByName(TextureNames.MAIN_PAGE);
        sky.width = Main.X;
        sky.height = Main.Y;
        sky.alpha = 1;
        this.addChild(sky);

		this.titleText = new egret.TextField();
        this.titleText.width = 1080;
        this.titleText.height = 120;
        this.titleText.x = 0;
        this.titleText.y = 60;
        this.titleText.size = 72;
        this.titleText.text = "开发者的话";
        this.titleText.textColor = 0x000000;
        this.titleText.fontFamily = "KaiTi";
        this.titleText.textAlign = egret.HorizontalAlign.CENTER;
        this.titleText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(this.titleText);

		this.contentText = new egret.TextField();
        this.contentText.width = 1000;
        this.contentText.height = 1320;
        this.contentText.x = 40;
        this.contentText.y = 300;
        this.contentText.size = 48;
        this.contentText.textFlow = TextHelper.developer_text;
        this.contentText.textColor = 0x000000;
        this.contentText.strokeColor = 0xffffff;
        this.contentText.stroke = 2;
        this.contentText.fontFamily = "KaiTi";
        this.contentText.textAlign = egret.HorizontalAlign.LEFT;
        this.contentText.verticalAlign = egret.VerticalAlign.TOP;
        this.addChild(this.contentText);

        let btnReturn = new ButtonWithText(550, 150, new egret.Point(Main.X * 0.5, Main.Y * 0.9), "返回");
        btnReturn.setAction(PageDeveloperWords.click_return);
        this.addChild(btnReturn);
    }

    public static click_return(evt:egret.TouchEvent) {
		PageDeveloperWords.INSTANCE.removeChildren();
        Main.getMain().removeChildren();
        Main.getMain().addChild(PageAboutGame.INSTANCE);
    }
    
}