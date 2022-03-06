import Entity, { States } from "../characters/Entity"
import { CharacterData } from "../consts/CharacterDataKeys"
import { GameConfig } from "../consts/GameConfig"
import { TextureKeys } from "../consts/TextureKeys"

export default class Sun extends Entity {
  health = 2

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    frame?: string | number | undefined
  ) {
    super(scene, x, y, TextureKeys.Sun, frame)
    this.scene = scene
    this.scene.add.existing(this)
    this.scene.physics.world.enableBody(
      this,
      Phaser.Physics.Arcade.DYNAMIC_BODY
    )
    this.body.setSize(this.width * 0.5, this.height * 0.5)
    this.setData(CharacterData.Speed, GameConfig.PlayerSpeed / 2)
  }

  update() {
    switch (this.state) {
      case States.Alive:
        if (this.health <= 0 || this.x <= -this.width) {
          this.state = States.Dead
        }
        break

      case States.Dead:
        this.destroy()
        break
    }
  }
}
