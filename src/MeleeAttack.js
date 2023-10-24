import Projectile from "./Projectile";


export default class MeleeAttack extends Projectile {
    constructor(game, direction) {
        super(game, 0, 0, direction);
        this.width = 50;
        this.height = 30;
        this.timedAttack = true;
        this.attackTime = 300;
        this.damage = 1;
        this.attackId = 'pogAttack420';

    }

    update(deltaTime) {
        if (this.direction === 1){
            this.positionX = this.game.player.width + this.game.player.positionX;
            this.positionY = this.game.player.height / 2 - this.height / 2 + this.game.player.positionY;
        }else{
            this.positionX = this.game.player.positionX - this.width;
            this.positionY = this.game.player.height / 2 - this.height / 2 + this.game.player.positionY;
        }
        this.attackTime -= deltaTime;
        if (this.attackTime <= 0){
            this.markedForDeletion = true;
            this.game.enemies.forEach(enemy => {
                enemy.attackId = enemy.attackId.replace(this.attackId,'');
            });
        }
    }

    draw(context) {
        context.fillStyle = "red"
        context.fillRect(this.positionX, this.positionY, this.width, this.height)
    }
}