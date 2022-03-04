import { CharacterData } from "../consts/CharacterDataKeys"

export default class Entity extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame)
  }

  moveUp() {
    this.setVelocityY(
      -Math.sqrt(
        this.getData(CharacterData.Speed) ** 2 - this.body.velocity.x ** 2
      )
    )
  }

  moveDown() {
    this.setVelocityY(
      Math.sqrt(
        this.getData(CharacterData.Speed) ** 2 - this.body.velocity.x ** 2
      )
    )
  }

  moveLeft() {
    this.setVelocityX(-this.getData(CharacterData.Speed))
  }

  moveRight() {
    this.setVelocityX(this.getData(CharacterData.Speed))
  }
}
