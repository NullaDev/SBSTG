class C1SEX extends StageBase {
	public constructor() {
        super("c1sex", 30);
    }

    protected initEmitters() {
		let point1 = new egret.Point(540, 600);
		let launcher1 = LauncherFactory.texturedLauncher(TextureNames.FLOWER0, 250, 200).setInitialPos(point1);
        launcher1.addLogic(
			new Flash(
				launcher1,
				240, 840,
				480, 720
			)
        	.setFreq(2000)
			.setDelay(1950)
		);

		launcher1.addLogic(
			new CustomShooter(
				launcher1,
				(launcher:Launcher) => {
					let ang = 360 * Math.random()
					for (let theta = ang; theta < ang + 360; theta += 360 / 32) {
						let theta1 = MyUtils.ang2rad(theta);
						let missile = 
						new EllipticalMissile()
						.setTexture(C1SEX.randomTexture())
                		.setSize(30, 36)
						.setPos(launcher.getPos())
						.setVelocity(20 * Math.cos(theta1), 20 * Math.sin(theta1));
						missile.addToStage(SelfMachine.INSTANCE.currentStage);
					}
				}
			)
        	.setFreq(400)
		);

		launcher1.addLogic(
			new CustomShooter(
				launcher1,
				(launcher:Launcher) => {
					let ang = 2 * Math.PI * Math.random();
					let texture = C1SEX.randomTexture2();
					for (let i = 0; i < 3; i++) {
						let v = 12 + 6 * i;
						for (let j = 0; j < 7; j++) {
							let missile = 
							new RoundMissile()
							.setSize(32, 32)
							.setTexture(texture)
							.setPos(launcher.getPos())
							.setVelocity(v * Math.cos(ang + j * Math.PI / 12), v * Math.sin(ang + j * Math.PI / 12))
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
										let theta = MissileUtils.getSniperAngle(missile.getPos());
										missile.setVelocity(40 * Math.cos(theta), 40 * Math.sin(theta))
										missile.setTexture(C1SEX.nextTexture(missile.getTexture()));
									}
								)
								.setStartTicks(20)
								.setTriggerTimes(1)
							)
							.addHandler(
								new TickEventHandler(
									(missile:MissileBase) => {
										missile.setTotalVelocity(missile.getVelocity() - 1);
									}
								)
								.setStartTicks(20)
								.setTriggerTimes(40)
							)
							.addHandler(
								new TickEventHandler(
									(missile:MissileBase) => {
										let theta = MissileUtils.getSniperAngle(missile.getPos());
										missile.setVelocity(30 * Math.cos(theta), 30 * Math.sin(theta))
										missile.setTexture(C1SEX.nextTexture(missile.getTexture()));
									}
								)
								.setStartTicks(50)
								.setTriggerTimes(1)
							);
							missile.addToStage(SelfMachine.INSTANCE.currentStage);
						}
					}
				}
        	)
			.setFreq(400)
			.setDelay(2000)
		);
	}

	private static randomTexture() {
		let ran = Math.random();
		return ran < 1/3 ? TextureNames.MISSILE_PETAL1 : ran < 2/3 ? TextureNames.MISSILE_PETAL2 : TextureNames.MISSILE_PETAL3;
	}

	private static randomTexture2() {
		let ran = Math.random();
		return ran < 1/3 ? TextureNames.MISSILE_RED : ran < 2/3 ? TextureNames.MISSILE_BLUE : TextureNames.MISSILE_GREEN;
	}

	private static nextTexture(texture:string) {
		if (texture == TextureNames.MISSILE_RED) return TextureNames.MISSILE_BLUE;
		else if (texture == TextureNames.MISSILE_BLUE) return TextureNames.MISSILE_GREEN;
		else return TextureNames.MISSILE_RED;
	}

}