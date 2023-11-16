import Enemy from "./Enemy";

export default class Ghost extends Enemy {
    constructor(game, x, y, dx) {
        super(game)
        this.positionX = x;
        this.positionY = y;
        this.defaultSpeedX = -3;
        this.speedX = -3;
        this.score = 2;
        this.hp = 5;
        this.originClass = false;
        super.adjustHitbox(16, 16)
        super.changeSprite(7, 4, 8, 3)
        this.spanXMin = this.positionX - dx;
        this.spanXMax = this.positionX + dx;
    }

    draw(context){
        //context.fillStyle = this.color;
        //context.fillRect(this.positionX,this.positionY,this.width,this.height)

        if (this.flip) {
            context.save()
            context.scale(-1, 1)
          }
      
          context.drawImage(
            this.image,
            this.frameX * this.width,
            this.frameY * this.height +1,
            this.width,
            this.height,
            this.flip ? this.positionX * -1 - this.width : this.positionX,
            this.positionY,
            this.width,
            this.height
          )
          if(this.flip)
            context.restore()
            if (this.game.debug){
                context.strokeRect(this.positionX, this.positionY, this.width, this.height)
                context.strokeRect(this.hitboxX,this.hitboxY,this.hitboxWidth,this.hitboxHeight)
            }
              

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

    update(deltaTime) {
        super.update(deltaTime)
        if (this.grounded) {
            this.speedY = 0
            this.speedX = this.defaultSpeedX;
        } else {
            this.speedY += this.game.gravity
        }
        if (this.speedY > 10)
            this.speedY = 10;
        if (this.positionX <= this.spanXMin)
            this.speedX = Math.abs(this.speedX);
        else if (this.positionX >= this.spanXMax)
            this.speedX = Math.abs(this.speedX) * -1;
        this.positionY += this.speedY
        this.positionX += this.speedX
        this.hitboxX = this.positionX + this.hitboxXMagicNumber;
        this.hitboxY = this.positionY + this.hitboxYMagicNumber;

        if (this.positionX + this.width < 0) this.markedForDeletion = true
    }
}