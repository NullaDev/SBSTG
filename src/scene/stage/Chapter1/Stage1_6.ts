class Stage1_6 extends StageBase {

    protected initEmitters() {
		let point1 = new egret.Point(540, 600);
        let em1 = new Launcher().setPos(point1);
        let up1_1 = new RenderLogic(TextureNames.FLOWER8, 240, 270).setParentEmitter(em1).renderOnStage(this);

		let up1_2 = new Scatter(
            new MissileConfig(MissileUtils.MISSILE_ROUND)
                .setTexture(TextureNames.MISSILE_PETAL4)
                .setVelocity(20)
            )
        .setParentEmitter(em1)
        .setFreq(150)
        .setStartAngle(0)
        .setStep(360 / 6)
        .setNumber(6);
		let up1_3 = new ScatterRotate().setParentEmitter(up1_2).setTPR(12);

        let up1_4 = new CustomShooter(
			(emitter:CustomShooter) => {
				let ang = MyUtils.ang2rad(30 + 30 * Math.random());
				for (let i = 0; i < 4; i++) {
					let v = 20 + 10 * i;
					let missile = new EllipticalMissile()
						.setSize(120, 90)
						.setTexture(TextureNames.FLOWER1)
						.setPos(emitter.getPos())
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
                                    for (let j = 0; j < 18; j++) {
										let theta = MissileUtils.getSniperAngle(missile.getPos()) + MyUtils.ang2rad(20 * j + 4 * Math.random() - 2);
										let missile1 = 
											new EllipticalMissile()
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
										missile1.addToStage(SelfMachine.INSTANCE.currentStage);
									}
									missile.setDead();
                                }
                            )
							.setStartTicks(20)
							.setTriggerTimes(1)
                        );
            		missile.addToStage(SelfMachine.INSTANCE.currentStage);
				}
			}
        )
		.setParentEmitter(em1)
		.setFreq(1000);

		let up1_5 = new CustomShooter(
			(emitter:CustomShooter) => {
				let ang = MyUtils.ang2rad(120 + 30 * Math.random());
				for (let i = 0; i < 4; i++) {
					let v = 20 + 10 * i;
					let missile = new EllipticalMissile()
						.setSize(120, 90)
						.setTexture(TextureNames.FLOWER2)
						.setPos(emitter.getPos())
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
                                    for (let j = 0; j < 9; j++) {
										let theta = MissileUtils.getSniperAngle(missile.getPos()) + MyUtils.ang2rad(40 * j);
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
											missile1.addToStage(SelfMachine.INSTANCE.currentStage);
										}
									missile.setDead();
                                }
                            )
							.setStartTicks(20)
							.setTriggerTimes(1)
                        );
            			missile.addToStage(SelfMachine.INSTANCE.currentStage);
					}
				}
            )
			.setParentEmitter(em1)
			.setFreq(1000)
			.setDelay(500);
	}

}