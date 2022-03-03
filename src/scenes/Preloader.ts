import Phaser from "phaser"
import { SceneKeys } from "../consts/SceneKeys"
import { TextureKeys } from "../consts/TextureKeys"

export default class Preloader extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Preloader)
  }

  preload() {
    this.load.image(TextureKeys.Forest, "backgrounds/example_bkg2.png")
    this.load.image(TextureKeys.Snowflake, "characters/snowflake32x32.png")
    this.load.image(TextureKeys.Bullet, "weapons/snowflakeBullet32x32.png")
  }

  create() {
    this.scene.start(SceneKeys.Game)
  }
}
