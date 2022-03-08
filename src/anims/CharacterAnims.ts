import Phaser from "phaser"
import { AnimationKeys } from "../consts/AnimationKeys"
import { TextureKeys } from "../consts/TextureKeys"

export function createCharacterAnims(
  anims: Phaser.Animations.AnimationManager,
) {
  anims.create({
    key: AnimationKeys.PlayerFloatSide,
    frames: [{ key: TextureKeys.PlayerFloat, frame: "floatbase1.png" }],
  })

  anims.create({
    key: AnimationKeys.PlayerFloatUp,
    frames: [{ key: TextureKeys.PlayerFloat, frame: "floatbase_up1.png" }],
  })

  anims.create({
    key: AnimationKeys.PlayerFloatDown,
    frames: [{ key: TextureKeys.PlayerFloat, frame: "floatbase_down1.png" }],
  })

  anims.create({
    key: AnimationKeys.PlayerFloatBack,
    frames: [{ key: TextureKeys.PlayerFloat, frame: "floatbase_back1.png" }],
  })

  anims.create({
    key: AnimationKeys.PlayerFloatFire,
    frames: anims.generateFrameNames(TextureKeys.PlayerFloat, {
      start: 1,
      end: 3,
      prefix: "floatbase",
      suffix: ".png",
    }),
    frameRate: 15,
  })
}
