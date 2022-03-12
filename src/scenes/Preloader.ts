import Phaser from "phaser"
import { CardKeys } from "../consts/CardKeys"
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

    this.load.image(CardKeys.CardIceBeam, "cards/CardIceBeam32x32.png")
    this.load.image(CardKeys.BlankCard, "cards/CardBack32x32.png")

    this.load.atlas(
      TextureKeys.PlayerFloat,
      "characters/playerfloat.png",
      "characters/playerfloat.json",
    )
  }

  create() {
    this.scene.start(SceneKeys.Game)
  }
}
