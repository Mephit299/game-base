export default class Enemy{
    constructor(game){
        this.game = game;
        this.positionX = 0;
        this.positionY = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.markedForDeletion = false;
        this.width = 50;
        this.height = 40;
        this.stayOnPlatform = false;
        this.isCollectable = false;
        this.color = "yellow";
        this.hp = 1;
    }

    update(){
        this.positionX += this.speedX;
        if (this.positionX < 0) this.markedForDeletion = true
    }

    draw(context){
        context.fillStyle = this.color;
        context.fillRect(this.positionX,this.positionY,this.width,this.height)

        if (this.game.debug) {
            context.strokeRect(this.positionX, this.positionY, this.width, this.height)
            context.fillStyle = 'black'
            context.font = '20px Arial'
            context.fillText(this.hp, this.positionX, this.positionY - 5)
            context.font = '12px Arial'
            context.fillText(`x: ${this.positionX.toFixed()}`, this.positionX + 20, this.positionY - 5)
            context.fillText(`y: ${this.positionY.toFixed()}`, this.positionX + 20, this.positionY - 20)
          }
    }
    isDead(){
        if (this.hp <= 0) 
        this.markedForDeletion = true;
    }
}