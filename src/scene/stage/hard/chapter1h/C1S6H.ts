class C1S6H extends StageBase {
	public constructor() {
        super("c1s6h", 25);
    }

    protected initEmitters() {
		let point1 = new egret.Point(540, 600);
		let launcher1 = LauncherFactory.texturedLauncher(TextureNames.FLOWER8, 240, 270).setInitialPos(point1);
		launcher1.addLogic(
			new ScatterRotate(
				launcher1,
				new RoundMissile()
					.setTexture(TextureNames.MISSILE_PETAL4)
					.setTotalVelocity(20)
            )
			.setFreq(150)
			.setStartAngle(0)
			.setStep(360 / 6)
			.setNumber(6)
			.setPeriod(12)
		);

        launcher1.addLogic(
			new CustomShooter(
				launcher1,
				(launcher:Launcher) => {
					let ang = MyUtils.ang2rad(30 + 30 * Math.random());
					for (let i = 0; i < 4; i++) {
						let v = 20 + 10 * i;
						let missile = new EllipticalMissile()
						.setSize(120, 90)
						.setTexture(TextureNames.FLOWER1)
						.setPos(launcher.getPos())
						.setVelocity(v * Math.cos(ang), v * Math.sin(ang))
						.addHandler(
							new TickEventHandler(
								(missile:MissileBase) => {
									missile.setTotalVelocity(missile.getVelocity() - v / 20);
								}
							)
							.setTriggerTimes(20)
						)
						.addHandler(
							new TickEventHandler(
								(missile:MissileBase) => {
									for (let j = 0; j < 24; j++) {
										let theta = MissileUtils.getSniperAngle(missile.getPos()) + MyUtils.ang2rad(15 * j + 4 * Math.random() - 2);
										let missile1 = new EllipticalMissile()
										.setSize(30, 36)
										.setTexture(TextureNames.MISSILE_PETAL2)
										.setPos(missile.getPos())
										.setVelocity(40 * Math.cos(theta), 40 * Math.sin(theta))
										.addHandler(
											new TickEventHandler(
												(missile:MissileBase) => {
													missile.setTotalVelocity(missile.getVelocity() - 0.5);
												}
											)
											.setTriggerTimes(40)
										)
										missile1.addToStage();
									}
									missile.setDead();
								}
							)
							.setStartTicks(20)
							.setTriggerTimes(1)
						);
						missile.addToStage();
					}
				}
			)
			.setFreq(1000)
		);

		launcher1.addLogic(
			new CustomShooter(
				launcher1,
				(launcher:Launcher) => {
					let ang = MyUtils.ang2rad(120 + 30 * Math.random());
					for (let i = 0; i < 4; i++) {
						let v = 20 + 10 * i;
						let missile = new EllipticalMissile()
						.setSize(120, 90)
						.setTexture(TextureNames.FLOWER2)
						.setPos(launcher.getPos())
						.setVelocity(v * Math.cos(ang), v * Math.sin(ang))
						.addHandler(
							new TickEventHandler(
								(missile:MissileBase) => {
									missile.setTotalVelocity(missile.getVelocity() - v / 20);
								}
							)
							.setTriggerTimes(20)
						)
						.addHandler(
							new TickEventHandler(
								(missile:MissileBase) => {
									let randomTheta = Math.random() * 2 * Math.PI;
									for (let j = 0; j < 24; j++) {
										let theta = randomTheta + MyUtils.ang2rad(15 * j + 4 * Math.random() - 2);
										let missile1 = new EllipticalMissile()
										.setSize(30, 36)
										.setTexture(TextureNames.MISSILE_PETAL1)
										.setPos(missile.getPos())
										.setVelocity(40 * Math.cos(theta), 40 * Math.sin(theta))
										.addHandler(
											new TickEventHandler(
												(missile:MissileBase) => {
													missile.setTotalVelocity(missile.getVelocity() - 0.5);
												}
											)
											.setTriggerTimes(40)
										)
										missile1.addToStage();
									}
									missile.setDead();
								}
							)
							.setStartTicks(20)
							.setTriggerTimes(1)
						);
						missile.addToStage();
					}
				}
			)
			.setFreq(1000)
			.setDelay(500)
		);
	}

}