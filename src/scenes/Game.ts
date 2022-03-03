import Phaser from "phaser"
import { SceneKeys } from "../consts/SceneKeys"
import { TextureKeys } from "../consts/TextureKeys"
import "../characters/Player"
import { GameConfig } from "../consts/GameConfig"

export default class Game extends Phaser.Scene {
  private background!: Phaser.GameObjects.TileSprite
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private player!: Phaser.Physics.Arcade.Sprite

  constructor() {
    super(SceneKeys.Game)
  }

  create() {
    const width = this.scale.width
    const height = this.scale.height

    this.background = this.add
      .tileSprite(0, 0, width, height, TextureKeys.Forest)
      .setOrigin(0, 0)
      .setScrollFactor(0, 0)

    this.physics.world.setBounds(0, 0, Number.MAX_SAFE_INTEGER, height)
    this.player = this.add.player(100, 100, TextureKeys.Snowflake)
    this.player.setVelocityX(GameConfig.MainSpeed)

    const body = this.player.body as Phaser.Physics.Arcade.Body
    body.setCollideWorldBounds(true)
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update(time: number, delta: number) {
    this.cameras.main.scrollX += 1
    this.background.setTilePosition(this.cameras.main.scrollX)

    this.player.update(this.cursors, delta)
  }
}
