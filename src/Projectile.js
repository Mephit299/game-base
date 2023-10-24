export default class Projectile{
    constructor(game, x, y, direction){
    this.game = game
    this.width = 8
    this.height = 6
    this.positionX = x
    this.positionY = y
    this.direction = direction

    this.speed = 5
    this.damage = 99
    this.markedForDeletion = false

    this.timedAttack = false
    this.attackTime = 0;
    this.attackId = 69420;
    }

    update(deltaTime){
        if (this.direction === 1)
            this.positionX += this.speed
        else this.positionX -= this.speed
        if (this.positionX > this.game.camera.x + this.game.width)
            this.markedForDeletion = true
    }

    draw(context){
        context.fillStyle = "black"
        context.fillRect(this.positionX,this.positionY,this.width,this.height)
    }
}