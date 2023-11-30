import Enemy from "./Enemy";
import HealthPotion from "./healthPotion";

export default class Boss extends Enemy {
    constructor(game, x, y, nextLevel) {
        super(game)
        this.positionX = x;
        this.positionY = y;
        this.defaultSpeedX = -0.5;
        this.speedX = -0.5;
        this.score = 10;
        this.hp = 10;
        this.originClass = false;
        this.height = 88;

        this.maxFrame = 2;
        this.runningMaxFrame = 2;
        this.takesDamageMaxFrame = 2;

        super.adjustHitbox(0, 0)
        this.fps = 6
        this.interval = 1000 / this.fps

        this.knockbackSpeedX = 3;
        this.knockbackSpeedY = 3;

        this.jumptimer = 0;
        this.nextLevel = nextLevel
    }

    update(deltaTime) {
        super.update(deltaTime)
        if (this.grounded) {
            this.speedY = 0
            this.speedX = this.defaultSpeedX;
        } else {
            this.speedY += this.game.gravity
        }
        this.jumptimer = this.jumptimer - deltaTime;
        if (this.speedY > 10)
            this.speedY = 10;
        if (this.game.player.positionX + this.game.player.width - this.game.player.hitboxXMagicNumber -5 > this.positionX && this.game.player.positionX < this.positionX + this.width && this.game.player.positionY < this.positionY + 150 && this.jumptimer <= 0){
            this.speedY = -7
            this.jumptimer = 2000;
        }
            
        if (this.game.player.positionX + this.game.width / 2 + 50 > this.positionX || this.game.width + 50 > this.positionX) {
            this.positionY += this.speedY
            this.positionX += this.speedX
            this.hitboxX = this.positionX + this.hitboxXMagicNumber;
            this.hitboxY = this.positionY + this.hitboxYMagicNumber;
        }
        if (this.positionX + this.width < 0) this.markedForDeletion = true
    }

    draw(context) {
        //context.fillStyle = this.color;
        //context.fillRect(this.positionX,this.positionY,this.width,this.height)

        if (this.flip) {
            context.save()
            context.scale(-1, 1)
        }

        context.drawImage(this.image, this.frameX * this.width, 616, this.width, this.height,
            this.flip ? this.positionX * -1 - this.width : this.positionX,
            this.positionY,
            this.width,
            this.height
        )
        if (this.flip)
            context.restore()
        if (this.game.debug) {
            context.strokeRect(this.positionX, this.positionY, this.width, this.height)
            context.strokeRect(this.hitboxX, this.hitboxY, this.hitboxWidth, this.hitboxHeight)
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
    playerKnockback(){}

    isDead(){
        super.isDead()
        if (this.markedForDeletion)
            this.game.enemies.push(new HealthPotion(this.game,this.positionX + 10, this.positionY + 20))
        if (this.nextLevel && this.markedForDeletion){
            this.game.nextLevel();
            this.game.player.hp++
        }
    }
}