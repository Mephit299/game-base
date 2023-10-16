import Enemy from "./Enemy";

export default class Slime extends Enemy{
    constructor(game){
        super(game)
        this.width = 32;
        this.height = 32;
        this.positionX = this.game.width;
        this.positionY = Math.random() * (this.game.height * 0.9 - this.height);
        this.speedX = Math.random() * -1.5 - 0.5;
        this.hp = 2;
        this.grounded = false
        this.speedY = 0;

    }

    update() {
        if (this.grounded) {
          this.speedY = 0
        } else {
          this.speedY += this.game.gravity
        }
    
        this.positionY += this.speedY
        this.positionX += this.speedX
        if (this.positionX < 0) this.markedForDeletion = true
      }
}