import Collectable from "./Collectable";


export default class NextLevelTrigger extends Collectable{
    constructor(game,x,y){
        super(game, x, y, 64, 64)
        this.color = "orange"
        this.hp = 999999;
    }

    pickUp(){ // om man en projektil rör en collectable förstörs den
        if (!this.game.gameOver)
        this.game.nextLevel();
        this.markedForDeletion = true;
    }
}