export default class Enemy{
    constructor(game){
        
        this.game = game;
        this.positionX = 0;
        this.positionY = 0;
        this.defaultSpeedX = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.markedForDeletion = false;
        this.width = 50;
        this.height = 40;
        this.hp = 1;
        this.score = 1;

        this.hitboxYMagicNumber = 0;
        this.hitboxXMagicNumber = 0;
        this.hitboxX = this.positionX + this.hitboxXMagicNumber;
        this.hitboxY = this.positionY + this.hitboxYMagicNumber;
        this.hitboxWidth = this.width - this.hitboxXMagicNumber*2;
        this.hitboxHeight = this.height - this.hitboxYMagicNumber;

        this.stayOnPlatform = false;
        this.isCollectable = false;
        this.color = "yellow";
        this.attackId = '';

        this.knockbackSpeedY = 5;
        this.knockbackSpeedX = 5;

        
    }

    update(){
        this.positionX += this.speedX;
        if (this.positionX + this.width < 0) this.markedForDeletion = true
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
        if (this.hp <= 0) {
            this.markedForDeletion = true;
        if (this.game.player.iFrames <= 0)
            this.game.scoreCounter += this.score
        }
    }
    knockback(direction){
        if (direction === 1)
            this.speedX = this.knockbackSpeedX
        else this.speedX = -this.knockbackSpeedX;
        this.speedY = -this.knockbackSpeedY;
        this.positionY -= 5;
        this.hitboxY -= 5;
    }
    playerKnockback(){
        if (this.game.player.positionX + 5 < this.positionX){
            this.speedX = this.knockbackSpeedX
            this.positionX += 10
            this.hitboxX += 10
        }
        else{
            this.speedX = -this.knockbackSpeedX;
            this.positionX -= 10;
            this.hitboxX -= 10
        } 
        this.speedY = -this.knockbackSpeedY;
        this.positionY -= 5;
        this.hitboxY -= 5;
    }

}