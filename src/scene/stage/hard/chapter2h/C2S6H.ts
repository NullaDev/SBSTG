class C2S6H extends StageBase {
    public constructor() {
        super("c2s6h", 20);
    }

    protected initEmitters() {
		let point1 = new egret.Point(540, 600); 
        let launcher1 = LauncherFactory.texturedLauncher(TextureNames.FLOWER0, 160, 120).setInitialPos(point1);
        launcher1.addLogic(
            new ScatterRotate(
                launcher1,
                new EllipticalMissile()
                .setSize(30, 36)
                .setTexture(TextureNames.MISSILE_PETAL1)
                .setTotalVelocity(15)
                .addHandler(
                    new TickEventHandler(
                        (missile:MissileBase) => {
                            let dx = missile.getX() - 540;
                            let dy = missile.getY() - 600;
                            let theta:number;
                            if (dx == 0) {
                                theta = dy >= 0? Math.PI / 2 : - Math.PI / 2;
                            } else if (dx > 0) {
                                theta = Math.atan(dy / dx);
                            } else {
                                theta = Math.atan(dy / dx) + Math.PI;
                            }
                            theta -= MyUtils.ang2rad(90);
                            missile.addVelocity(0.5 * Math.cos(theta), 0.5 * Math.sin(theta));
                        }
                    )
                )
            )
            .setNumber(6)
            .setStartAngle(360 / 6 / 2)
            .setStep(360 / 6)
            .setPeriod(Math.PI) //随便来个无理数防止安定
            .setFreq(50)
        )
        launcher1.addLogic(
            new ScatterRotate(
                launcher1,
                new EllipticalMissile()
                .setSize(30, 36)
                .setTexture(TextureNames.MISSILE_PETAL2)
                .setTotalVelocity(15)
                .addHandler(
                    new TickEventHandler(
                        (missile:MissileBase) => {
                            let dx = missile.getX() - 540;
                            let dy = missile.getY() - 600;
                            let theta:number;
                            if (dx == 0) {
                                theta = dy >= 0? Math.PI / 2 : - Math.PI / 2;
                            } else if (dx > 0) {
                                theta = Math.atan(dy / dx);
                            } else {
                                theta = Math.atan(dy / dx) + Math.PI;
                            }
                            theta += MyUtils.ang2rad(90);
                            missile.addVelocity(0.5 * Math.cos(theta), 0.5 * Math.sin(theta));
                        }
                    )
                )
            )
            .setNumber(6)
            .setStartAngle(360 / 6 / 2)
            .setStep(360 / 6)
            .setPeriod(-Math.PI) //随便来个无理数防止安定
            .setFreq(50)
        )

        launcher1.addLogic(
            new ScatterRotate(
                launcher1,
                new RoundMissile()
                .setTexture(TextureNames.MISSILE_PETAL4)
                .setTotalVelocity(20.01)
                .addHandler(
                    new TickEventHandler(
                        (missile:MissileBase) => {
                            missile.setTotalVelocity(missile.getVelocity() - 1);
                        }
                    )
                    .setTriggerTimes(20)
                )
                .addHandler(
                    new TickEventHandler(
                        (missile:MissileBase) => {
                            missile.setTotalVelocity(missile.getVelocity() + 1)
                        }
                    )
                    .setStartTicks(30)
                )
            )
            .setNumber(72)
            .setStep(360 / 72)
            .setFreq(500)
            .setPeriod(108)
        )
	}
}