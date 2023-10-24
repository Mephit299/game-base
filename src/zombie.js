import Enemy from "./Enemy";

export default class Zombie extends Enemy{
    constructor(game,x,y,){
        super(game)
        this.positionX = x;
        this.positionY = y;
        this.stayOnPlatform = true;
        this.defaultSpeedX = -2;
        this.speedX = -2;
        this.score = 2;
        this.hp = 2;
        
        
    }

    update() {
        if (this.grounded) {
          this.speedY = 0
          this.speedX = this.defaultSpeedX;
        } else {
          this.speedY += this.game.gravity
        }
    
        this.positionY += this.speedY
        this.positionX += this.speedX
        if (this.positionX < 0) this.markedForDeletion = true
      }
}