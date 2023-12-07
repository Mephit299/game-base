import Enemy from "./Enemy";
import HealthPotion from "./healthPotion";

export default class Vampire extends Enemy {
    constructor(game, x, y) {
        super(game)
        this.positionX = x;
        this.positionY = y;
        this.stayOnPlatform = true;
        this.defaultSpeedX = -5;
        this.speedX = -1.5;
        this.score = 4;
        this.hp = 3;
        this.originClass = false;
        super.adjustHitbox(16, 16)
        super.changeSprite(3, 4, 4, 3)
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
        if (this.game.player.positionX - this.positionX <= 130 && this.game.player.positionX - this.positionX >= -124) {
            if (this.flip)
                this.speedX = -5;
            else if (!this.flip)
                this.speedX = 5;
            else if (this.flip)
                this.speedX = -1.5
            else this.speedX = 1.5
        }
        else if (this.flip)
            this.speedX = -1.5
        else this.speedX = 1.5
        if (this.game.player.positionX - this.positionX < -336)
            this.speedX = -1.5;
        else if (this.game.player.positionX - this.positionX > 400)
            this.speedX = 1.5;
        if (this.game.player.positionX + this.game.width / 2 + 50 > this.positionX || this.game.width + 50 > this.positionX) {
            this.positionY += this.speedY
            this.positionX += this.speedX
            this.hitboxX = this.positionX + this.hitboxXMagicNumber;
            this.hitboxY = this.positionY + this.hitboxYMagicNumber;
        }
    }
    playerKnockback(){
        super.playerKnockback()
        this.hp++
    }

    isDead(){
        super.isDead()
        if  (this.markedForDeletion)
            this.game.enemies.push(new HealthPotion(this.game, this.positionX +10, this.positionY))
    }

}