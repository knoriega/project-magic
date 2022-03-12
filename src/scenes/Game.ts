import Phaser from "phaser"
import { SceneKeys } from "../consts/SceneKeys"
import { TextureKeys } from "../consts/TextureKeys"
import "../characters/Player"
import Sun from "../enemies/Sun"
import Player from "../characters/Player"
import Bullet from "../weapons/Bullet"
import { GameConfig } from "../consts/GameConfig"
import { EventKeys, sceneEvents } from "../events/EventsCenter"
import { createCharacterAnims } from "../anims/CharacterAnims"
import { CardKeys } from "../consts/CardKeys"

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
    this.scene.run(SceneKeys.GameUi)
    createCharacterAnims(this.anims)

    const width = this.scale.width
    const height = this.scale.height
    this.physics.world.setBounds(
      0,
      GameConfig.UiMargin + 2,
      width,
      height - GameConfig.UiMargin * 2 - 4,
    )

    this.background1 = this.add
      .tileSprite(0, GameConfig.UiMargin, width, height, TextureKeys.Woods1)
      .setOrigin(0, 0)
      .setCrop(0, 0, 320, 180)

    this.background2 = this.add
      .tileSprite(0, GameConfig.UiMargin, width, height, TextureKeys.Woods2)
      .setOrigin(0, 0)
      .setCrop(0, 0, 320, 180)

    this.background3 = this.add
      .tileSprite(0, GameConfig.UiMargin, width, height, TextureKeys.Woods3)
      .setOrigin(0, 0)
      .setCrop(0, 0, 320, 180)

    this.player = this.add.player(
      100,
      100,
      TextureKeys.PlayerFloat,
      "floatbase1.png",
    )

    this.enemies = this.physics.add.group()

    this.physics.add.overlap(
      this.player.bullets,
      this.enemies,
      this.handleBulletEnemyOverlap,
      undefined,
      this,
    )

    this.player.colliders.push(
      this.physics.add.overlap(
        this.player,
        this.enemies,
        this.handlePlayerEnemyOverlap,
        undefined,
        this,
      ),
    )

    const body = this.player.body as Phaser.Physics.Arcade.Body

    /* Setting up hitbox for player */
    body.setCollideWorldBounds(true)
    body.setSize(body.width, body.height / 3)
    body.setOffset(20)

    this.time.addEvent({
      delay: 1000,
      callback: () => {
        const sun = new Sun(
          this,
          this.scale.width + 50,
          Phaser.Math.Between(
            GameConfig.UiMargin + 10,
            this.scale.height - GameConfig.UiMargin - 10,
          ),
        )
        this.enemies.add(sun)
        sun.moveLeft()
      },
      callbackScope: this,
      loop: true,
    })

    /* Add card to hand */
    this.time.addEvent({
      delay: 3000,
      callback: () => {
        for (let index = 0; index < 4; index++) {
          const card = {
            texture: CardKeys.CardIceBeam,
            weapon: { fire: () => console.log("Ice Beam!") },
            used: false,
          }
          this.player.hand.push(card)
          sceneEvents.emit(EventKeys.PlayerAddCard, card, index)
        }
      },
    })
  }
  handlePlayerEnemyOverlap(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject,
  ) {
    const player = obj1 as Player
    const enemy = obj2 as Sun
    player.handleDamage()
    enemy.health = 0 // Enemies destroyed on contact
    sceneEvents.emit(EventKeys.PlayerHealthChange, player.health)
  }

  handleBulletEnemyOverlap(
    obj1: Phaser.GameObjects.GameObject,
    obj2: Phaser.GameObjects.GameObject,
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
