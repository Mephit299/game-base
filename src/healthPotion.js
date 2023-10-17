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
    }
    pickUp(){
        if (!this.game.gameOver)
        this.game.player.hp++
        this.markedForDeletion = true;
    }
}