import Enemy from "./Enemy";

export default class NextLevelTrigger extends Enemy{
    constructor(game,x,y){
        super(game)
        this.isCollectable = true;
        this.positionX = x;
        this.positionY = y;
        this.width = 20;
        this.height = 30;
        this.color = "orange"
        this.score = 0;
        this.hp = 999999;
    }
    pickUp(){ // om man en projektil rör en collectable förstörs den
        if (!this.game.gameOver)
        this.game.nextLevel();
        this.markedForDeletion = true;
    }
    knockback(){}
}