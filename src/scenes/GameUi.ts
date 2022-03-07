import Phaser from "phaser"
import { GameConfig } from "../consts/GameConfig"
import { SceneKeys } from "../consts/SceneKeys"
import { EventKeys, sceneEvents } from "../events/EventsCenter"

export default class GameUi extends Phaser.Scene {
  constructor() {
    super(SceneKeys.GameUi)
  }

  create() {
    const lives = this.add.text(10, 10, "3", {
      fontSize: "14",
      color: "#ffffff",
    })

    sceneEvents.on(EventKeys.PlayerHealthChange, (health: number) => {
      lives.text = health.toString()
    })
  }
}
