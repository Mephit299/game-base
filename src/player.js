import Projectile from "./Projectile";

export default class Player{
    constructor(game){
    this.game = game;
    this.positionX = 200;
    this.positionY = 200;
    this.width = 50;
    this.height = 50;
    this.hp = 3;

    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 5;

    this.projectiles = [];
    this.ammo = 10;
    this.shootTimer = 0;

    }

    update(deltaTime){
        if(this.game.keys.includes('ArrowUp') || this.game.keys.includes('w')) 
            this.speedY = -this.maxSpeed;
        else if(this.game.keys.includes('ArrowDown') || this.game.keys.includes('s')) 
            this.speedY = this.maxSpeed;
        else    this.speedY = 0;

        if(this.game.keys.includes('ArrowLeft') || this.game.keys.includes('a'))
            this.speedX = -this.maxSpeed;
        else if(this.game.keys.includes(`ArrowRight`) || this.game.keys.includes('d'))
            this.speedX = this.maxSpeed;
        else    this.speedX = 0;
          
        this.positionX += this.speedX;
        this.positionY += this.speedY;

        this.projectiles.forEach((projectile) => {
            projectile.update()
          })
          this.projectiles = this.projectiles.filter(
            (projectile) => !projectile.markedForDeletion
          )
          
          if(this.shootTimer > 0)
            this.shootTimer -= deltaTime
        }
    

    draw(context){
        context.fillStyle = "blue"
        context.fillRect(this.positionX,this.positionY,this.width,this.height)

        this.projectiles.forEach((projectile) => {projectile.draw(context)})
    }

    shoot() {
        if(this.ammo > 0 && this.shootTimer <= 0){
            this.projectiles.push(
            new Projectile(this.game, this.positionX + this.width, this.positionY + this.height / 2)
            )
            this.ammo--
            this.shootTimer = 500;
        } 
      }
    
}