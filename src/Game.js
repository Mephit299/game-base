import Player from "./player"
import InputHandler from "./InputHandeler"
import UserInterface from "./UserInterface"
import Slime from "./Slime"
import Platform from "./Platform"
import Zombie from "./zombie"
import HealthPotion from "./healthPotion"

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
    this.scoreCounter = 0;
    
    this.enemies = [new HealthPotion(this, 350 , 180),new Zombie(this,200,100)]
    this.enemyTimer = 0;
    this.enemyInterval = 1000;

    this.ground = this.height - 70;
    this.platforms = [
      new Platform(this,0,this.ground,this.width,100, true),
      new Platform(this, this.width - 200, 280, 200, 20, true),
      new Platform(this, 200, 200, 300, 20, true)
    ]
    
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
        if (enemy.isCollectable){enemy.pickUp()}
        else{
          if (this.player.iFrames <=0)
            this.player.hp--
          enemy.hp--
          this.player.iFrames = 300;
          }
      }
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          enemy.hp -= projectile.damage
          if (!projectile.timedAttack)
            projectile.markedForDeletion = true
        }
      })
      enemy.isDead()
    })
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)
  
    this.platforms.forEach((platform) => {
      if (this.checkPlatformCollision(this.player, platform)) {
        if (this.player.speedY < 0 && this.player.height/3 + this.player.positionY > platform.positionY  && platform.isSolid){
          this.player.positionY = platform.positionY + platform.height
          
        } else {
        this.player.positionY = platform.positionY - this.player.height
        this.player.grounded = true
      }
      this.player.speedY = 0
      }
      this.enemies.forEach((enemy) => {
        if (this.checkPlatformCollision(enemy, platform)) {
          enemy.speedY = 0
          enemy.positionY = platform.positionY - enemy.height
          if (enemy.stayOnPlatform){
            if (enemy.positionX < platform.positionX || enemy.positionX + enemy.width > platform.positionX + platform.width)
              enemy.speedX *= -1

          }
        }
      })
    })  
  }

  draw(context) {
    this.platforms.forEach((platform) => platform.draw(context))
    this.player.draw(context)
    this.enemies.forEach((enemy) => enemy.draw(context))
    this.ui.draw(context)
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

  checkPlatformCollision(object, platform) {
    if (
      object.positionY + object.height >= platform.positionY &&
      object.positionY < platform.positionY + platform.height &&
      object.positionX + object.width >= platform.positionX &&
      object.positionX <= platform.positionX + platform.width
    ) { 
      if (object.grounded && object.positionY + object.height > platform.positionY) {
        object.speedY = 0
        object.positionY = platform.positionY - object.height
        object.grounded = true
      }
      return true
    } else {
      if (object.grounded && object.positionY + object.height < platform.positionY) {
        object.grounded = false
      }
      return false
    }
  }
}
