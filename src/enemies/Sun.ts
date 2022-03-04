import Entity from "../characters/Entity"
import { CharacterData } from "../consts/CharacterDataKeys"
import { GameConfig } from "../consts/GameConfig"
import { TextureKeys } from "../consts/TextureKeys"

export default class Sun extends Entity {
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
}
