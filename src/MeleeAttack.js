import Projectile from "./Projectile";


export default class MeleeAttack extends Projectile {
    constructor(game, direction) {
        super(game, 0, 0, direction);
        this.width = 50;
        this.height = 30;
        this.timedAttack = true;
        this.attackTime = 300;
        this.damage = 1;

    }

    update(deltaTime) {
        console.log(this.direction);
        if (this.direction === 1){
            this.positionX = this.game.player.width + this.game.player.positionX;
            this.positionY = this.game.player.height / 2 - this.height / 2 + this.game.player.positionY;
        }else{
            this.positionX = this.game.player.positionX - this.width;
            this.positionY = this.game.player.height / 2 - this.height / 2 + this.game.player.positionY;
        }
        this.attackTime -= deltaTime;
        if (this.attackTime <= 0)
            this.markedForDeletion = true;
    }

    draw(context) {
        context.fillStyle = "red"
        context.fillRect(this.positionX, this.positionY, this.width, this.height)
    }
}