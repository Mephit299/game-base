import Projectile from "./Projectile";
import MeleeAttack from "./MeleeAttack";

export default class Player{
    constructor(game){
    this.game = game;
    this.positionX = 200;
    this.positionY = 300;
    this.width = 50;
    this.height = 50;
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
    this.ammo = 10;
    this.shootTimer = 0;
    this.baseballbatTimer = 0;

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
        //if(this.positionX + this.width > this.game.width)
        //    this.positionX = this.game.width - this.width;
        //if(this.positionY < 0)
        //    this.positionY = 0;
        //if(this.positionY + this.height > this.game.height)
        //    this.positionY = this.game.height - this.height


        this.projectiles.forEach((projectile) => {
            projectile.update(deltaTime)
        })
            this.projectiles = this.projectiles.filter(
                (projectile) => !projectile.markedForDeletion
            )

        if(this.shootTimer > 0)
            this.shootTimer -= deltaTime
        if(this.baseballbatTimer > 0)
            this.baseballbatTimer -= deltaTime

        if (this.iFrames > 0)
            this.iFrames -= deltaTime;
        }
    

    draw(context){
        context.fillStyle = "blue"
        context.fillRect(this.positionX,this.positionY,this.width,this.height)
        if (this.iFrames > 0)
            context.strokeRect(this.positionX, this.positionY, this.width, this.height)

        this.projectiles.forEach((projectile) => {projectile.draw(context)})
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
        this.baseballbatTimer = 350;
        }
      }
    
}