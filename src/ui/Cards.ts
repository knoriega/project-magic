import { CardKeys } from "../consts/CardKeys"
import { GameConfig } from "../consts/GameConfig"
import { Weapon } from "../weapons/Bullet"

export interface Card {
  texture: CardKeys
  weapon: Weapon
  used: boolean
}

export class Hand extends Phaser.GameObjects.Container {
  marginX = (320 - 40 * GameConfig.HandSize) / 2
  cards: Phaser.GameObjects.Sprite[] = []

  constructor(scene: Phaser.Scene, cards?: Card[]) {
    super(scene)
    for (let index = 0; index < GameConfig.HandSize; index++) {
      this.cards.push(
        scene.add
          .sprite(
            this.marginX + this.cards.length * 40,
            this.scene.scale.height - GameConfig.UiMargin,
            CardKeys.BlankCard,
          )
          .setOrigin(0, 0)
          .setVisible(false),
      )
    }
  }

  /* Place card on screen and change texture */
  setCard(card: Card, position: number) {
    this.cards[position].setVisible(true).setTexture(card.texture)
  }

  /* Used card will vanish and set texture back to blank card */
  useCard(position: number) {
    this.cards[position].setVisible(false).setTexture(CardKeys.BlankCard)
  }
}
