import Phaser from "phaser"
import { GameConfig } from "../consts/GameConfig"
import { SceneKeys } from "../consts/SceneKeys"
import { EventKeys, sceneEvents } from "../events/EventsCenter"
import { Card, Hand } from "../ui/Cards"

export default class GameUi extends Phaser.Scene {
  constructor() {
    super(SceneKeys.GameUi)
  }

  create() {
    const hand = new Hand(this)
    const lives = this.add.text(10, 10, "3", {
      fontSize: "14",
      color: "#ffffff",
    })

    const reloadSign = this.add
      .text(10, this.scale.height - 22, "Reloading...", {
        fontSize: "14",
        color: "#ffffff",
      })
      .setVisible(false)

    const deckCounter = this.add
      .text(this.scale.width - 47, this.scale.height - 22, "Deck: 0", {
        fontSize: "14",
        color: "#ffffff",
      })
      .setVisible(false)

    sceneEvents.on(EventKeys.PlayerHealthChange, (health: number) => {
      lives.text = health.toString()
    })

    sceneEvents.on(EventKeys.PlayerAddCard, (card: Card, position: number) => {
      hand.setCard(card, position)
    })

    sceneEvents.on(EventKeys.PlayerUseCard, (position: number) => {
      hand.useCard(position)
    })

    sceneEvents.on(EventKeys.PlayerDeckChange, (length: number) => {
      deckCounter.setText(`Deck: ${length.toString()}`).setVisible(true)
    })

    sceneEvents.on(
      EventKeys.PlayerReload,
      (reloadTime: number) => {
        reloadSign.setVisible(true)
        this.add.tween({
          targets: reloadSign,
          alpha: 0.1,
          yoyo: true,
          ease: Phaser.Math.Easing.Linear,
          duration: reloadTime / 2,
          onComplete: () => reloadSign.setVisible(false),
        })
      },
      this,
    )
  }
}
