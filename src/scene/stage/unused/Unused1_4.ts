class Unused1 extends StageBase {
    public constructor() {
        super("unused1_4", 20);
    }

    protected initEmitters() {
        let point1 = new egret.Point(540, 720);
        let launcher1 = LauncherFactory.texturedLauncher(TextureNames.FLOWER8, 150, 170).setInitialPos(point1);
        launcher1.addLogic(
            new ScatterRotate(
                launcher1,
                new RoundMissile()
                .setTexture(TextureNames.MISSILE_PETAL4)
                .setTotalVelocity(20)
            )
            .setFreq(300)
            .setStartAngle(0)
            .setStep(360 / 4)
            .setNumber(4)
            .setPeriod(15)
        );

        launcher1.addLogic(
            new ScatterRotate(
                launcher1,
                new RoundMissile()
                .setTexture(TextureNames.MISSILE_PETAL4)
                .setTotalVelocity(20)
            )
            .setFreq(300)
            .setStartAngle(0)
            .setStep(360 / 4)
            .setNumber(4)
            .setPeriod(-15)
        );
		
		let point2 = new egret.Point(360, 720);
        let launcher2 = LauncherFactory.texturedLauncher(TextureNames.FLOWER1, 120, 90).setInitialPos(point2);
        launcher2.addLogic(
            new ScatterRotate(
                launcher2,
                new EllipticalMissile()
                .setSize(30, 36)
                .setTexture(TextureNames.MISSILE_PETAL2)
                .setTotalVelocity(15)
                .addHandler(
                    new TickEventHandler(
                        (missile:MissileBase) => {
                            missile.setTotalVelocity(missile.getVelocity() - 1);
                        }
                    )
                    .setTriggerTimes(15)
                )
                .addHandler(
                    new TickEventHandler(
                        (missile:MissileBase) => {
                            let theta = MissileUtils.getSniperAngle(missile.getPos());
                            missile.setVelocity(10 * Math.cos(theta), 10 * Math.sin(theta));
                        }
                    )
                    .setTriggerTimes(1)
                    .setStartTicks(60)
                )
                .addHandler(
                    new TickEventHandler(
                        (missile:MissileBase) => {
                            missile.setTotalVelocity(missile.getVelocity() + 0.5);
                        }
                    )
                    .setTriggerTimes(20)
                    .setStartTicks(60)
                )
            )
            .setFreq(300)
            .setStartAngle(0)
            .setStep(360 / 3)
            .setNumber(3)
            .setPeriod(4)
        );

		let point3 = new egret.Point(720, 720);
        let launcher3 = LauncherFactory.texturedLauncher(TextureNames.FLOWER2, 120, 90).setInitialPos(point3);
        launcher3.addLogic(
            new ScatterRotate(
                launcher3,
                new EllipticalMissile()
                .setSize(30, 36)
                .setTexture(TextureNames.MISSILE_PETAL1)
                .setTotalVelocity(15)
                .addHandler(
                    new TickEventHandler(
                        (missile:MissileBase) => {
                            missile.setTotalVelocity(missile.getVelocity() - 1);
                        }
                    )
                    .setTriggerTimes(15)
                )
                .addHandler(
                    new TickEventHandler(
                        (missile:MissileBase) => {
                            let dx = point3.x - missile.getX();
                            let dy = point3.y - missile.getY();
                            let theta:number;
                            if (dx == 0) {
                                theta = dy >= 0? Math.PI / 2 : - Math.PI / 2;
                            } else if (dx > 0) {
                                theta = Math.atan(dy / dx);
                            } else {
                                theta = Math.atan(dy / dx) + Math.PI;
                            }
                            theta += Math.PI / 4 * (2 * Math.random() - 1);
                            missile.setVelocity(10 * Math.cos(theta), 10 * Math.sin(theta));
                        }
                    )
                    .setTriggerTimes(1)
                    .setStartTicks(60)
                )
                .addHandler(
                    new TickEventHandler(
                        (missile:MissileBase) => {
                            missile.setTotalVelocity(missile.getVelocity() + 0.5);
                        }
                    )
                    .setTriggerTimes(20)
                    .setStartTicks(60)
                )
            )
            .setFreq(300)
            .setStartAngle(0)
            .setStep(360 / 3)
            .setNumber(3)
            .setPeriod(-4)
        );

	}
}