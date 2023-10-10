export default class Enemy{
    constructor(game){
        this.game = game;
        this.positionX = 0;
        this.positionY = 0;
        this.speedX = 0;
        this.markedForDeletion = false;
        this.width = 50;
        this.height = 40;
    }

    update(){
        this.positionX += this.speedX;
        if (this.positionX < 0) this.markedForDeletion = true
    }

    draw(context){
        context.fillStyle = "yellow"
        context.fillRect(this.positionX,this.positionY,this.width,this.height)

        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height)
            context.fillStyle = 'black'
            context.font = '20px Arial'
            context.fillText(this.lives, this.x, this.y - 5)
            context.font = '12px Arial'
            context.fillText(`x: ${this.x.toFixed()}`, this.x + 20, this.y - 5)
            context.fillText(`y: ${this.y.toFixed()}`, this.x + 20, this.y - 20)
          }

    }
}