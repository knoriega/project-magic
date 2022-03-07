import Phaser from "phaser"

const sceneEvents = new Phaser.Events.EventEmitter()

enum EventKeys {
  PlayerHealthChange = "player-health-change",
}

export { sceneEvents, EventKeys }
