import { CharacterData } from "../consts/CharacterDataKeys"

export enum States {
  Alive,
  Dead,
  Damaged,
}

export default class Entity extends Phaser.Physics.Arcade.Sprite {
  health!: number
  state!: States

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame)
    this.state = States.Alive
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
