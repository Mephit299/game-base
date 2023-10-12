import Projectile from "./Projectile";


export default class MeleeAttack extends Projectile {
    constructor(game) {
        super(game, 0, 0);
        this.width = 50;
        this.height = 30;
        this.timedAttack = true;
        this.attackTime = 300;

    }

    update(deltaTime) {
        this.positionX = this.game.player.width + this.game.player.positionX;
        this.positionY = this.game.player.height / 2 - this.height / 2 + this.game.player.positionY;
        this.attackTime -= deltaTime;
        if (this.attackTime <= 0)
            this.markedForDeletion = true;
    }

    draw(context) {
        context.fillStyle = "red"
        context.fillRect(this.positionX, this.positionY, this.width, this.height)
    }
}