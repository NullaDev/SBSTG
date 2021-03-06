class C3S2H extends StageBase {
    public constructor() {
        super("c3s2h", 20);
    }

     protected initEmitters() {
        let launcher1 = LauncherFactory.normalLauncher();
        launcher1.addLogic(
            new SideShooter(
                launcher1,
                new RoundMissile()
                .setTexture(TextureNames.MISSILE_HAIL)
                .setTotalVelocity(0)
                .addHandler(
                    new TickEventHandler(
                        (missile:MissileBase) => {
                            let v = missile.getVelocity() + 2 * Math.random();
							v = Math.min(v, 48);
							missile.setTotalVelocity(v);
                        }
                    )
                )
            )
            .setFreq(50)
            .setStartAngle(85)
            .setEndAngle(95)
            .setNumber(3)
        );
    }
	
}