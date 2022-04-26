import Phaser from "phaser"

const sceneEvents = new Phaser.Events.EventEmitter()

enum EventKeys {
  PlayerHealthChange = "player-health-change",
  PlayerAddCard = "player-add-card",
  PlayerUseCard = "player-use-card",
  PlayerReload = "player-reload",
  PlayerDeckChange = "player-deck-change",
}

export { sceneEvents, EventKeys }
