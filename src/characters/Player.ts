import Phaser from "phaser"
import { AnimationKeys } from "../consts/AnimationKeys"
import { CharacterData } from "../consts/CharacterDataKeys"
import { GameConfig } from "../consts/GameConfig"
import { EventKeys, sceneEvents } from "../events/EventsCenter"
import { Card } from "../ui/Cards"
import { BulletGroup } from "../weapons/Bullet"
import Entity, { States } from "./Entity"

enum GameObjectFactoryFunctions {
  Player = "player", // Generates faune object
}

/* 
To make sure Phaser knows the factory exists 
when using intellisense -- Declaration merging of namespaces 
*/
declare global {
  namespace Phaser.GameObjects {
    interface GameObjectFactory {
      [GameObjectFactoryFunctions.Player](
        x: number,
        y: number,
        texture: string,
        frame?: string | number,
      ): Player
    }
  }
}

export default class Player extends Entity {
  health = 3
  bullets: BulletGroup
  nextFire: number = 0
  invincibilityTimer = GameConfig.InvincibilityTimer
  reloading = false
  hand: Card[] = []
  deck: Card[] = []
  discard: Card[] = []
  cardButtons: Phaser.Input.Keyboard.Key[] = []

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    super(scene, x, y, texture, frame)
    this.bullets = new BulletGroup(scene)
    this.setData(CharacterData.Speed, GameConfig.PlayerSpeed)
    this.cardButtons = [
      scene.input.keyboard.addKey("A"),
      scene.input.keyboard.addKey("S"),
      scene.input.keyboard.addKey("D"),
      scene.input.keyboard.addKey("F"),
    ]
  }

  /* Take bullet from pool and fire! */
  fire() {
    this.bullets.fire(this.x, this.y)
  }

  drawCards(num: number) {
    this.deck.splice(-num).forEach((card, idx) => {
      this.hand.push(card)
      sceneEvents.emit(EventKeys.PlayerAddCard, card, idx)
    })
    sceneEvents.emit(EventKeys.PlayerDeckChange, this.deck.length)
  }

  handleDamage() {
    if (this.state == States.Dead || this.state == States.Damaged) return

    --this.health
    if (this.health <= 0) this.state = States.Dead
    else {
      this.invincibilityTimer = GameConfig.InvincibilityTimer
      this.state = States.Damaged
      this.colliders.forEach((c) => (c.active = false))
      this.scene.add.tween({
        targets: this,
        alpha: 0,
        yoyo: true,
        ease: Phaser.Math.Easing.Stepped(1),
        duration: 75,
        repeat: 10,
      })
      this.setTint(0xff0000) // Red
    }
  }

  preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta)
    this.checkHandReload()

    switch (this.state) {
      case States.Alive:
        if (this.health <= 0) this.state = States.Dead
        break

      case States.Damaged:
        this.invincibilityTimer -= delta
        if (this.invincibilityTimer <= 0) {
          this.state = States.Alive
          this.colliders.forEach((c) => (c.active = true))
          this.setTint(0xffffff) // No tint
        }
        break

      case States.Dead:
        this.setTint(0x000000)
        this.colliders.forEach((c) => (c.active = false))
        break
    }
  }

  private checkHandReload() {
    if (
      this.hand.length &&
      this.hand.every((card) => card.used) &&
      !this.reloading
    ) {
      let reloadTime: number
      this.reloading = true
      this.discard.push(...this.hand.splice(-this.hand.length))

      /* Shuffle discard into deck if needed*/
      if (this.deck.length) {
        reloadTime = GameConfig.ReloadTimer
      } else {
        reloadTime = GameConfig.ReloadTimer * 2
        console.log("Shuffling discard into deck...")
        ;[this.deck, this.discard] = [this.discard, this.deck]
        Phaser.Utils.Array.Shuffle(this.deck)
      }

      sceneEvents.emit(EventKeys.PlayerReload, reloadTime)
      this.scene.time.addEvent({
        delay: reloadTime,
        callback: () => {
          this.drawCards(GameConfig.HandSize)
          this.reloading = false
        },
      })
    }
  }

  update(cursors: Phaser.Types.Input.Keyboard.CursorKeys) {
    // Reset velocity to account for case where no buttons are pushed
    this.setVelocity(0, 0)
    let animate: boolean

    if (this.state == States.Dead) return

    if (Phaser.Input.Keyboard.JustDown(cursors.space)) {
      this.play(AnimationKeys.PlayerFloatFire, true)
    }
    if (cursors.space.isDown) {
      this.fire()
      animate = false
    } else {
      this.play(AnimationKeys.PlayerFloatSide)
      animate = true
    }

    if (cursors.down.isDown) {
      if (animate) this.play(AnimationKeys.PlayerFloatDown)
      this.moveDown()
    } else if (cursors.up.isDown) {
      if (animate) this.play(AnimationKeys.PlayerFloatUp)
      this.moveUp()
    }

    if (cursors.left.isDown) {
      if (animate) this.play(AnimationKeys.PlayerFloatBack)
      this.moveLeft()
    } else if (cursors.right.isDown) {
      if (animate) this.play(AnimationKeys.PlayerFloatSide)
      this.moveRight()
    }

    this.cardButtons.forEach((button, idx) => {
      const card = this.hand[idx]
      if (button.isDown && card && !card.used) {
        card.weapon.fire(this.x, this.y)
        card.used = true
        sceneEvents.emit(EventKeys.PlayerUseCard, idx)
      }
    })
  }
}

/* Game Object Factory Pattern */
Phaser.GameObjects.GameObjectFactory.register(
  GameObjectFactoryFunctions.Player,

  /* Copying general flow from how Physics.add.sprite() works */
  function (
    this: Phaser.GameObjects.GameObjectFactory,
    x: number,
    y: number,
    texture: string,
    frame?: string | number,
  ) {
    const sprite = new Player(this.scene, x, y, texture, frame)
    this.displayList.add(sprite)
    this.updateList.add(sprite)
    this.scene.physics.world.enableBody(
      sprite,
      Phaser.Physics.Arcade.DYNAMIC_BODY,
    )

    sprite.body.setSize(sprite.width * 0.5, sprite.height * 0.8)

    return sprite
  },
)
