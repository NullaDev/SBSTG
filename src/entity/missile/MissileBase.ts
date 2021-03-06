abstract class MissileBase {

	protected _missile_width = 24;
    protected _missile_height = 24;
    protected _texture = TextureNames.MISSILE_STANDARD;

    protected _life:number;

    protected _posX = 0;
    protected _posY = 0;
    protected _vx = 0;
    protected _vy = 0;
    public ignoreCollideCheck:boolean = false;

    protected _handler:Array<MissileEventHandler> = [];

    protected img:egret.Bitmap;
    public isBottomLayer = false;

    public constructor() {
        this._life = 0;
    }

    public setSize(width:number, height:number) {
        this._missile_width = width;
        this._missile_height = height;
        return this;
    }

    public resize(width:number, height:number) {
        this._missile_width = width;
        this._missile_height = height;
        this.img.width = width;
		this.img.height = height;
		this.img.anchorOffsetX = width / 2;
        this.img.anchorOffsetY = height / 2;
        return this;
    }

    public rotate(ang:number) {
        this.img.rotation += ang;
    }

    public getWidth() {
        return this._missile_width;
    }

    public getHeight() {
        return this._missile_height;
    }

    public addHandler(handler:MissileEventHandler) {
        this._handler.push(handler);
        return this;
    }

    public removeHandler(handler:MissileEventHandler) {
        return MyUtils.removeObjectFromArray(handler, this._handler);
    }

    public setTexture(texture:string) {
        this._texture = texture;
        if (this.img != null) {
            this.img.texture = RES.getRes(texture);
        }
        return this;
    }

    public setPos(point:egret.Point) {
        this._posX = point.x;
        this._posY = point.y;
        return this;
    }

    public setPosX(posx:number) {
        this._posX = posx;
        return this;
    }

    public setPosY(posy:number) {
        this._posY = posy;
        return this;
    }

    public setVelocity(vx:number, vy:number) {
        this._vx = vx;
        this._vy = vy;
        return this;
    }

    public setVelocityX(vx:number) {
        this._vx = vx;
        return this;
    }

    public setVelocityY(vy:number) {
        this._vy = vy;
        return this;
    }

    public addVelocity(vx:number, vy:number) {
        this._vx += vx;
        this._vy += vy;
        return this;
    }

    /**
     * 设置子弹总速度且不改变方向。静止子弹向正下方发射。
     */
    public setTotalVelocity(v:number) {
        let _v = this.getVelocity();
        if (_v <= 0) {
            this._vx = 0;
            this._vy = v;
        } else {
            this._vx = v * this._vx / _v;
            this._vy = v * this._vy / _v;
        }
        return this;
    }

    public getVelocity() {
        return Math.sqrt(this._vx * this._vx + this._vy * this._vy);
    }

    public getVelocityX() {
        return this._vx;
    }

    public getVelocityY() {
        return this._vy;
    }

    public getDirection() {
        if (this._vx == 0) {
            return this._vy >= 0? Math.PI / 2 : - Math.PI / 2;
        } else if (this._vx > 0) {
            return Math.atan(this._vy / this._vx);
        } else {
            return Math.atan(this._vy / this._vx) + Math.PI;
        }
    }

    public getTexture() {
        return this._texture;
    }

    public getLife() {
        return this._life;
    }

    public addToStage() {
        let stage = SelfMachine.INSTANCE.currentStage;
        let layer = this.isBottomLayer? DrawingLayer.BOTTOM_MISSILE : DrawingLayer.UPPER_MISSILE;
        this.initIMG();
        stage.addChildAtLayer(this.img, layer);
        stage.arrayMissile.push(this);
    }

    public setBottomLayer(bool:boolean) {
        this.isBottomLayer = bool;
		return this;
    }

    public abstract initIMG();

    /**
     * 子弹在每个tick都要进行的动作，例如位置变换。
     * 子弹tick时间通常为50ms。
     */
    public onUpdate(event: egret.TimerEvent) {
        this._life++;
        this._posX += this._vx;
        this._posY += this._vy;
        this.img.x = this._posX;
        this.img.y = this._posY;

        if (this.shouldSetDead()) {
            this.setDead();
        }
    }

    public static tickLogic(event: MissileTickEvent) {
        for (let i of event.getMissile()._handler) {
            if (i instanceof TickEventHandler) {
                i.trigger(event.getMissile());
            }
        }
    }

    public static edgeLogic(event: MissileEdgeEvent) {
        for (let i of event.getMissile()._handler) {
            if (i instanceof EdgeEventHandler) {
                i.trigger(event.getMissile());
            }
        }
    }
    
    public hasSpecialLogic(type):boolean {
        if (this._handler == null) {
            return false;
        }
        for (let i of this._handler) {
            if (i instanceof type) {
                return true;
            }
        }
        return false;
    }

    /**
     * 检测该子弹是否需要消弹
     */
    protected abstract shouldSetDead():boolean;

    public setDead() {
        this._handler = null;
        if (this.img != null && this.img.parent != null)
            this.img.parent.removeChild(this.img);
        MyUtils.removeObjectFromArray(this, SelfMachine.INSTANCE.currentStage.arrayMissile);
    }

    public getX() {
        return this._posX;
    }

    public getY() {
        return this._posY;
    }

    public getPos() {
        return new egret.Point(this._posX, this._posY);
    }

    /**
     * 检测该子弹是否与自机碰撞，自机对象从instance获取
     */
    public abstract isCollide():boolean;

    public getEdge():Side {
        if (this.getY() < Main.UPPER_Y) {
            return Side.TOP;
        } else if (this.getY() > Main.BELOW_Y) {
            return Side.BOTTOM;
        } else if (this.getX() < 0) {
            return Side.LEFT;
        } else if (this.getX() > Main.X) {
            return Side.RIGHT;
        }
        return null;
    }

    /** 制作该子弹的一个复制。 */
    public abstract clone():MissileBase;

}