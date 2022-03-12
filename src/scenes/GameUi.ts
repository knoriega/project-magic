import Phaser from "phaser"
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

    sceneEvents.on(EventKeys.PlayerHealthChange, (health: number) => {
      lives.text = health.toString()
    })

    sceneEvents.on(EventKeys.PlayerAddCard, (card: Card, position: number) => {
      hand.setCard(card, position)
    })

    sceneEvents.on(EventKeys.PlayerUseCard, (position) => {
      hand.useCard(position)
    })
  }
}
