import Phaser from "phaser"
import Game from "./scenes/Game"
import Preloader from "./scenes/Preloader"

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 467,
  height: 267,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      // debug: true,
    },
  },
  scene: [Preloader, Game],
}

export default new Phaser.Game(config)
