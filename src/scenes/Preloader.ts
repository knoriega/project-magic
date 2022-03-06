import Phaser from "phaser"
import { SceneKeys } from "../consts/SceneKeys"
import { TextureKeys } from "../consts/TextureKeys"

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader)
  }

  preload() {
    this.load.image(TextureKeys.Forest, "backgrounds/example_bkg2.png")
    this.load.image(TextureKeys.Woods1, "backgrounds/background_layer_1.png")
    this.load.image(TextureKeys.Woods2, "backgrounds/background_layer_2.png")
    this.load.image(TextureKeys.Woods3, "backgrounds/background_layer_3.png")
    this.load.image(TextureKeys.Snowflake, "characters/snowflake16x16.png")
    this.load.image(TextureKeys.Bullet, "weapons/snowflakeBullet16x16.png")
    this.load.image(TextureKeys.Sun, "enemies/sun_enemy.png")
  }

  create() {
    this.scene.start(SceneKeys.Game)
  }
}
