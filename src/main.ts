import Phaser from "phaser"
import Game from "./scenes/Game"
import Preloader from "./scenes/Preloader"

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  pixelArt: true,
  title: "Project Magic",
  width: 320,
  height: 180,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      // debug: true,
    },
  },
  scene: [Preloader, Game],
  scale: {
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    zoom: 3,
  },
}

export default new Phaser.Game(config)
