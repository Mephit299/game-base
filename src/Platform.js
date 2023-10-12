export default class Plattform{
    constructor(game, x, y, width, height){
        this.game = game;
        this.positionX = x;
        this.positionY = y;
        this.width = width;
        this.height = height;
    }

    update(){}

    draw(context) {
        context.fillStyle = "green"
        context.fillRect(this.x, this.y, this.width, this.height)
    
        if (this.game.debug) {
          context.fillStyle = 'black'
          context.strokeRect(this.x, this.y, this.width, this.height)
          context.font = '12px Arial'
          context.fillText(`x: ${this.positionX.toFixed()}`, this.positionX + 20, this.positionY - 5)
          context.fillText(`y: ${this.positionY.toFixed()}`, this.positionX + 20, this.positionY - 20)
        }
      }
}