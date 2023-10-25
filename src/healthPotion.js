import Enemy from "./Enemy";

export default class HealthPotion extends Enemy{
    constructor(game,x,y){
        super(game)
        this.isCollectable = true;
        this.positionX = x;
        this.positionY = y;
        this.width = 20;
        this.height = 30;
        this.color = "red"
        this.score = 0;
        this.hp = 3;
    }
    pickUp(){ // om man en projektil rör en collectable förstörs den
        if (!this.game.gameOver)
        this.game.player.hp++
        this.markedForDeletion = true;
    }
    knockback(){}
}