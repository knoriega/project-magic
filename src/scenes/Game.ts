import Phaser from "phaser"
import { SceneKeys } from "../consts/SceneKeys"
import { TextureKeys } from "../consts/TextureKeys"
import "../characters/Player"
import Sun from "../enemies/Sun"

export default class Game extends Phaser.Scene {
  private background!: Phaser.GameObjects.TileSprite
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private player!: Phaser.Physics.Arcade.Sprite
  private enemies!: Phaser.Physics.Arcade.Group

  constructor() {
    super(SceneKeys.Game)
  }

  create() {
    const width = this.scale.width
    const height = this.scale.height

    this.background = this.add
      .tileSprite(0, 0, width, height, TextureKeys.Forest)
      .setOrigin(0, 0)

    this.physics.world.setBounds(0, 0, width, height)
    this.player = this.add.player(100, 100, TextureKeys.Snowflake)
    this.enemies = this.physics.add.group({
      classType: Sun,
    })

    const body = this.player.body as Phaser.Physics.Arcade.Body
    body.setCollideWorldBounds(true)

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        const sun = new Sun(
          this,
          this.scale.width + 50,
          Phaser.Math.Between(0, this.scale.height)
        )
        this.enemies.add(sun)
        sun.moveLeft()
      },
      callbackScope: this,
      loop: true,
    })
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update(time: number, delta: number) {
    this.background.tilePositionX += 1
    this.player.update(this.cursors)
  }
}
