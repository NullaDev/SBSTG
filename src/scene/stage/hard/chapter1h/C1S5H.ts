class C1S5H extends StageBase {
    public constructor() {
        super("c1s5h", 20);
    }

    protected initEmitters() {
        let point1 = new egret.Point(540, 540);
        let launcher1 = LauncherFactory.texturedLauncher(TextureNames.FLOWER0, 160, 120).setInitialPos(point1);
        launcher1.addLogic(
            new ScatterRotate(
                launcher1,
                new EllipticalMissile()
                .setSize(30, 36)
                .setTexture(TextureNames.MISSILE_PETAL1)
                .setTotalVelocity(20)
            )
            .setFreq(300)
            .setStartAngle(0)
            .setStep(360 / 12)
            .setNumber(12)
            .setPeriod(-20)
        );
        launcher1.addLogic(
            new RandomShooter(
                launcher1,
                new EllipticalMissile()
                .setSize(30, 36)
                .setTexture(TextureNames.MISSILE_PETAL3)
                .setTotalVelocity(15)
            )
            .setFreq(1000)
            .setStartAngle(0)
            .setEndAngle(360)
            .setNumber(36)
            .setExtraVelocity(20)
        );

        let launcher2 = LauncherFactory.texturedLauncher(TextureNames.FLOWER1, 120, 90).setInitialPos(new egret.Point(3000, 3000));
        launcher2.addLogic(
            new Flash(
                launcher2,
                270, 810,
                480, 600
            )
            .setFreq(2000)
        )
        launcher2.addLogic(
            new CustomShooter(
                launcher2,
                (launcher:Launcher) => {
                    {
                        let theta = MissileUtils.getSniperAngle(launcher2.getPos());
                        let missile = new EllipticalMissile()
                        .setSize(30, 36)
                        .setTexture(TextureNames.MISSILE_PETAL2)
                        .setPos(launcher2.getPos())
                        .setVelocity(45 * Math.cos(theta), 45 * Math.sin(theta));
                        missile.addToStage();
                    }            
                    for (let i = 1; i <= 10; i++) {
                        for (let j = 0; j <= 10; j++) {
                            let theta = MissileUtils.getSniperAngle(launcher2.getPos()) + MyUtils.ang2rad(3) * i * (1 - 0.2 * j);
                            let missile = new EllipticalMissile()
                            .setSize(30, 36)
                            .setTexture(TextureNames.MISSILE_PETAL2)
                            .setPos(launcher2.getPos())
                            .setVelocity(0.01 * Math.cos(theta), 0.01 * Math.sin(theta))
                            .addHandler(
                                new TickEventHandler(
                                    (missile:MissileBase) => {
                                        missile.setTotalVelocity(45);
                                    }
                                )
                                .setStartTicks(2 * i)
                                .setTriggerTimes(1)
                            )
                            missile.addToStage();
                        }
                    }
                }
            )
            .setFreq(2000)
        )
	}
	
}