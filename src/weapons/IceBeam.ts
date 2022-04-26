import { TextureKeys } from "../consts/TextureKeys"
import Bullet, { BulletGroup } from "./Bullet"

export class IceBeamBullet extends Bullet {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    frame?: string | number,
  ) {
    super(scene, x, y, frame, TextureKeys.IceBeam)
  }
}

export default class IceBeam extends BulletGroup {
  protected fireRate = 50

  constructor(scene: Phaser.Scene) {
    super(scene)
  }
}
