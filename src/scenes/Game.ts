import Phaser from "phaser"
import { SceneKeys } from "../consts/SceneKeys"
import { TextureKeys } from "../consts/TextureKeys"
import "../characters/Player"
import Sun from "../enemies/Sun"
import Player from "../characters/Player"
import Bullet from "../weapons/Bullet"

export default class Game extends Phaser.Scene {
  private background1!: Phaser.GameObjects.TileSprite
  private background2!: Phaser.GameObjects.TileSprite
  private background3!: Phaser.GameObjects.TileSprite
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private player!: Player
  private enemies!: Phaser.Physics.Arcade.Group

  constructor() {
    super(SceneKeys.Game)
  }

  create() {
    const width = this.scale.width
    const height = this.scale.height

    this.background1 = this.add
      .tileSprite(0, 0, width, height, TextureKeys.Woods1)
      .setOrigin(0, 0)

    this.background2 = this.add
      .tileSprite(0, 0, width, height, TextureKeys.Woods2)
      .setOrigin(0, 0)

    this.background3 = this.add
      .tileSprite(0, 0, width, height, TextureKeys.Woods3)
      .setOrigin(0, 0)

    this.physics.world.setBounds(0, 0, width, height)
    this.player = this.add.player(100, 100, TextureKeys.Snowflake)
    this.enemies = this.physics.add.group({
      classType: Sun,
    })

    this.physics.add.overlap(
      this.player.bullets,
      this.enemies,
      this.handleBulletEnemyOverlap,
      undefined,
      this
    )

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

  handleBulletEnemyOverlap(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject
  ) {
    const bullet = obj1 as Bullet
    const enemy = obj2 as Sun
    bullet.setVisible(false)
    bullet.setActive(false)
    bullet.body.enable = false

    enemy.health -= 1
  }

  preload() {
    this.cursors = this.input.keyboard.createCursorKeys()
  }

  update(time: number, delta: number) {
    this.background1.tilePositionX += 0.1
    this.background2.tilePositionX += 0.5
    this.background3.tilePositionX += 1
    this.player.update(this.cursors)
    this.enemies.getChildren().forEach((e) => e.update())
  }
}
