import Player from "./player"
import InputHandler from "./InputHandeler"
import UserInterface from "./UserInterface"
import Slime from "./Slime"

export default class Game {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)
    this.keys = []
    this.gameOver = false
    this.gravity = 1
    this.debug = false
    this.player = new Player(this)
    this.gameTime = 0;
    
    this.enemies = []
    this.enemyTimer = 0;
    this.enemyInterval = 1000;
    
  }

  update(deltaTime) {
    if( this.player.hp < 1)
      this.gameOver = true;
    if (!this.gameOver) {
      this.gameTime += deltaTime
    }
    this.player.update(deltaTime)

    if(this.enemyTimer > this.enemyInterval && !this.gameOver){
      this.addEnemySlime();
      this.enemyTimer = 0;
    } else this.enemyTimer += deltaTime;
    
    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime)
      if (this.checkCollision(this.player, enemy)) {
        enemy.markedForDeletion = true
        this.player.hp--
      }
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          console.log("trevligt");
          enemy.markedForDeletion = true
          projectile.markedForDeletion = true
        }
      })
    })
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
  }

  draw(context) {
    this.ui.draw(context)
    this.player.draw(context)
    this.enemies.forEach((enemy) => enemy.draw(context))
  }

  addEnemySlime() {
    this.enemies.push(new Slime(this))
  }

  checkCollision(object1, object2) {
    return (
      object1.positionX < object2.positionX + object2.width &&
      object1.positionX + object1.width > object2.positionX &&
      object1.positionY < object2.positionY + object2.height &&
      object1.height + object1.positionY > object2.positionY
    )
  }
}
