import Projectile from "./Projectile";
import MeleeAttack from "./MeleeAttack";
import spriteImage from './assets/sprites/player.png';

export default class Player{
    constructor(game){
    this.game = game;
    this.positionX = 200;
    this.positionY = 300;
    this.width = 78;
    this.height = 58;
    this.hp = 3;
    this.iFrames = 0;

    this.speedX = 0;
    this.speedY = 0;
    this.maxSpeed = 5;
    this.jumpSpeed = 10
    this.grounded = false;
    this.coyoteFrames = 0;
    this.direction = 1;

    this.projectiles = [];
    this.ammo = 3;
    this.shootTimer = 0;
    this.baseballbatTimer = 0;

    const image = new Image();
    image.src = spriteImage;
    this.image = image;
    this.flip = false;

    this.frameX = 0
    this.frameY = 1
    this.maxFrame = 8
    this.fps = 20
    this.timer = 0
    this.interval = 1000 / this.fps

    }

    update(deltaTime){
        if (this.grounded)
            this.coyoteFrames = 3;
        else this.coyoteFrames--

        if(this.game.keys.includes('ArrowUp') && this.grounded || this.game.keys.includes('w') && this.coyoteFrames > 0 || this.game.keys.includes('ArrowUp') && this.coyoteFrames > 0 || this.game.keys.includes('w') && this.grounded){
            this.speedY = -this.jumpSpeed;
            this.grounded = false;
        }  
    //    else if(this.game.keys.includes('ArrowDown') || this.game.keys.includes('s')) 
    //    this.speedY = this.maxSpeed;
    //    else    this.speedY = 0;

        if(this.game.keys.includes('ArrowLeft') || this.game.keys.includes('a')){
            this.speedX = -this.maxSpeed;
            this.direction = 0;
        }
        else if(this.game.keys.includes(`ArrowRight`) || this.game.keys.includes('d')){
            this.speedX = this.maxSpeed;
            this.direction = 1;
        }
        else    this.speedX = 0;

        if (this.grounded) {
            this.speedY = 0
          } else {
            this.speedY += this.game.gravity
          }

          
        this.positionX += this.speedX;
        this.positionY += this.speedY;
        if(this.positionX < 0)
            this.positionX = 0;

        this.projectiles.forEach((projectile) => {
            projectile.update(deltaTime)

        })
            this.projectiles = this.projectiles.filter(
                (projectile) => !projectile.markedForDeletion
            )

            if (this.speedX < 0) {
                this.flip = true
              } else if (this.speedX > 0) {
                this.flip = false
              }
            
              if (this.timer > this.interval) {
                this.frameX++
                this.timer = 0
              } else {
                this.timer += deltaTime
              }
            
              // reset frameX when it reaches maxFrame
              if (this.frameX >= this.maxFrame) {
                this.frameX = 0
              }

        if(this.shootTimer > 0)
            this.shootTimer -= deltaTime
        if(this.baseballbatTimer > 0)
            this.baseballbatTimer -= deltaTime

        if (this.iFrames > 0)
            this.iFrames -= deltaTime;
        }
    

    draw(context){
        this.projectiles.forEach((projectile) => {projectile.draw(context)})
        context.fillStyle = "blue"
        context.fillRect(this.positionX,this.positionY,this.width,this.height)
        if (this.iFrames > 0 || this.game.debug)
            context.strokeRect(this.positionX, this.positionY, this.width, this.height)

        if (this.flip) {
            context.save()
            context.scale(-1, 1)
          }
      
          context.drawImage(
            this.image,
            this.frameX * this.width,
            this.frameY * this.height - 14,
            this.width,
            this.height,
            this.flip ? this.positionX * -1 - this.width : this.positionX,
            this.positionY,
            this.width,
            this.height
          )
          if(this.flip)
            context.restore()
              
    }

    shoot() {
        if(this.ammo > 0 && this.shootTimer <= 0){
            this.projectiles.push(
            new Projectile(this.game, this.positionX + this.width/2, this.positionY + this.height / 2, this.direction)
            )
            this.ammo--
            this.shootTimer = 500;
        } 
      }
      strike(){
        if(this.baseballbatTimer <=0){
            this.projectiles.push(new MeleeAttack(this.game,this.direction))
        this.baseballbatTimer = 500;
        }
      }
    
}