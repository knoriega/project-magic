import Phaser from "phaser"
import { TextureKeys } from "../consts/TextureKeys"

export class BulletGroup extends Phaser.Physics.Arcade.Group {
  private nextFire: number = 0
  private fireRate: number = 200

  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene)

    this.maxSize = 30

    /* Generate object pool */
    this.createMultiple({
      classType: Bullet,
      quantity: 30,
      active: false,
      visible: false,
      key: TextureKeys.Bullet,
    })

    this.nextFire = scene.time.now
  }

  fire(x: number, y: number) {
    if (this.scene.time.now > this.nextFire) {
      const bullet: Bullet = this.getFirstDead(false, x + 10, y)
      if (bullet) bullet.fire()
      this.nextFire = this.scene.time.now + this.fireRate
    }
  }
}

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  private fireSpeed = 400

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    frame?: string | number
  ) {
    super(scene, x, y, TextureKeys.Bullet, frame)
  }

  fire() {
    this.setVisible(true)
    this.setActive(true)
    this.setVelocityX(this.fireSpeed)
  }

  protected preUpdate(time: number, delta: number): void {
    if (this.x > this.scene.cameras.main.scrollX + this.scene.scale.width) {
      this.setVisible(false)
      this.setActive(false)
    }
  }
}
