export default class Projectile{
    constructor(game, x, y){
    this.game = game
    this.width = 8
    this.height = 6
    this.positionX = x
    this.positionY = y

    this.speed = 5
    this.damage = 1
    this.markedForDeletion = false

    this.timedAttack = false
    this.attackTime = 0;
    }

    update(deltaTime){
        this.positionX += this.speed
        if (this.positionX > this.game.width)
            this.markedForDeletion = true
    }

    draw(context){
        context.fillStyle = "black"
        context.fillRect(this.positionX,this.positionY,this.width,this.height)
    }
}