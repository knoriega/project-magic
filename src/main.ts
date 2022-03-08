import Phaser from "phaser"
import { GameConfig } from "./consts/GameConfig"
import Game from "./scenes/Game"
import GameUi from "./scenes/GameUi"
import Preloader from "./scenes/Preloader"

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  pixelArt: true,
  title: "Project Magic",
  width: 320,
  height: 180 + GameConfig.UiMargin * 2,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      // debug: true,
    },
  },
  scene: [Preloader, Game, GameUi],
  scale: {
    autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    zoom: 2.75,
  },
}

export default new Phaser.Game(config)
