class Stage2_1 extends StageBase {

    protected initEmitters() {
        let launcher1 = LauncherFactory.normalLauncher();
        launcher1.addLogic(
            new SideShooter(
                launcher1,
                new RoundMissile()
                .setTexture(TextureNames.MISSILE_BLUE)
                .setTotalVelocity(15)
                .addHandler(
                    new EdgeEventHandler(
                        (missile:MissileBase) => {
                            let side = missile.getEdge();
                            if (side == Side.LEFT) {
                                missile.setPosX(missile.getX() + Main.X);
                            } else if (side == Side.RIGHT) {
                                missile.setPosX(missile.getX() - Main.X);
                            } else {
                                missile.setDead();
                            }
                        }
                    )
                )
            )
            .setFreq(250)
            .setStartAngle(75)
            .setEndAngle(105)
            .setNumber(8)
            .setExtraVelocity(5)
        );
    }

}