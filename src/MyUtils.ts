class MyUtils {
    public static createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    public static cleanMissile(stage: StageBase) {
        let array1 = stage.arrayMissile.slice(0);
        for (let j of array1) {
            j.setDead();
        }
    }

    public static cleanController(stage: StageBase) {
        let array1 = stage.arrayController.slice(0);
        for (let j of array1) {
            j.setDead();
        }
    }

    public static removeFromArray(object:any, array:Array<any>) {
        for (let i: number = 0; i < array.length; i++) {
			if (array[i] == object) {
				array.splice(i, 1);
				break;
			}
		}
    }

}

enum Side {
    TOP, BOTTOM, LEFT, RIGHT
}