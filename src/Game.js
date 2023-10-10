import Player from "./player"
import InputHandler from "./InputHandeler"
import UserInterface from "./UserInterface"

export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)
    this.keys = []
    this.enemies = []
    this.gameOver = false
    this.gravity = 1
    this.debug = false
    this.player = new Player(this)
    this.gameTime = 0;
  }

  update(deltaTime) {
    if (!this.gameOver) {
      this.gameTime += deltaTime
    }
    this.player.update(deltaTime)
  }

  draw(context) {
    this.ui.draw(context)
    this.player.draw(context)
  }
}
