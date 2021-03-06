class C1S2 extends StageBase {
    public constructor() {
        super("c1s2", 20);
    }

    protected initEmitters() {
        let point1 = new egret.Point(540, 300);
        let launcher1 = LauncherFactory.texturedLauncher(TextureNames.FLOWER1, 160, 120).setInitialPos(point1);
        launcher1.addLogic(
            new Scatter(
                launcher1,
                new EllipticalMissile()
                .setSize(30, 36)
                .setTexture(TextureNames.MISSILE_PETAL2)
                .setTotalVelocity(12)
            )
            .setFreq(750)
            .setStartAngle(45)
            .setStep(90 / 10)
            .setNumber(11)
        );

        let point2 = new egret.Point(108, 420);
        let launcher2 = LauncherFactory.texturedLauncher(TextureNames.FLOWER3, 80, 120).setInitialPos(point2);
        launcher2.addLogic(
            new Sniper(
                launcher2,
                new RoundMissile()
                .setTexture(TextureNames.MISSILE_LIANZI)
                .setTotalVelocity(25)
                .addHandler(
                    new TickEventHandler(
                        (missile:MissileBase) => {
                            missile.setTotalVelocity(missile.getVelocity() - 0.5);
                        }
                    )
                    .setTriggerTimes(20)
                )
            )
            .setFreq(250)
            .setDelay(1000)
        );

        let point3 = new egret.Point(324, 360);
        let launcher3 = LauncherFactory.texturedLauncher(TextureNames.FLOWER3, 80, 120).setInitialPos(point3);
        launcher3.addLogic(
            new Sniper(
                launcher3,
                new RoundMissile()
                .setTexture(TextureNames.MISSILE_LIANZI)
                .setTotalVelocity(25)
                .addHandler(
                    new TickEventHandler(
                        (missile:MissileBase) => {
                            missile.setTotalVelocity(missile.getVelocity() - 0.5);
                        }
                    )
                    .setTriggerTimes(20)
                )
            )
            .setFreq(250)
            .setDelay(1000)
        );

        let point4 = new egret.Point(756, 360);
        let launcher4 = LauncherFactory.texturedLauncher(TextureNames.FLOWER3, 80, 120).setInitialPos(point4);
        launcher4.addLogic(
            new Sniper(
                launcher4,
                new RoundMissile()
                .setTexture(TextureNames.MISSILE_LIANZI)
                .setTotalVelocity(25)
                .addHandler(
                    new TickEventHandler(
                        (missile:MissileBase) => {
                            missile.setTotalVelocity(missile.getVelocity() - 0.5);
                        }
                    )
                    .setTriggerTimes(20)
                )
            )
            .setFreq(250)
            .setDelay(1000)
        );

        let point5 = new egret.Point(972, 420);
        let launcher5 = LauncherFactory.texturedLauncher(TextureNames.FLOWER3, 80, 120).setInitialPos(point5);
        launcher5.addLogic(
            new Sniper(
                launcher5,
                new RoundMissile()
                .setTexture(TextureNames.MISSILE_LIANZI)
                .setTotalVelocity(25)
                .addHandler(
                    new TickEventHandler(
                        (missile:MissileBase) => {
                            missile.setTotalVelocity(missile.getVelocity() - 0.5);
                        }
                    )
                    .setTriggerTimes(20)
                )
            )
            .setFreq(250)
            .setDelay(1000)
        );
    }
    
}