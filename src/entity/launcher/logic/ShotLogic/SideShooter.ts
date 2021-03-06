class SideShooter extends ShotLogicBase {

    protected _ang1 = 0;
    protected _ang2 = 180;
    protected _num = 1;
    protected _extra_velocity = 0;
    protected _side:Side = Side.TOP;

    public constructor(launcher:Launcher, prototype:MissileBase) {
        super(launcher, prototype);
    }

    public setStartAngle(ang:number) {
        this._ang1 = ang;
        return this;
    }

    public setEndAngle(ang:number) {
        this._ang2 = ang;
        return this;
    }

    public setNumber(num:number) {
        this._num = num;
        return this;
    }

    public setSide(side:Side) {
        this._side = side;
        return this;
    }

    public setExtraVelocity(num:number) {
        this._extra_velocity = num;
        return this;
    }

    private getPointFromSide():egret.Point {
        switch(this._side) {
            case Side.TOP:
                return new egret.Point(Main.X * Math.random(), Main.UPPER_Y);
            case Side.BOTTOM:
                return new egret.Point(Main.X * Math.random(), Main.BELOW_Y);
            case Side.LEFT:
                return new egret.Point(0, Main.UPPER_Y + Math.random() * (Main.BELOW_Y - Main.UPPER_Y));
            case Side.RIGHT:
                return new egret.Point(Main.X, Main.UPPER_Y + Math.random() * (Main.BELOW_Y - Main.UPPER_Y));
            default:
                return null;
        }
    }

    public onUpdate(event: egret.TimerEvent) {
        let i = 0;
        while(i++ < this._num) {
            let missile = this.createMissile();
            let theta = (this._ang1 + Math.random() * (this._ang2 - this._ang1));
            theta = MyUtils.ang2rad(theta);
            let v = missile.getVelocity();
            missile.setVelocity(v * Math.cos(theta), v * Math.sin(theta));
            missile.addToStage();
        }
    }

    public createMissile() {
        let point = this.getPointFromSide();
        let missile = this._missile_prototype.clone();
        let v = missile.getVelocity() + Math.random() * this._extra_velocity;
        return missile.setTotalVelocity(v).setPos(point);
	}

}
