import Collectable from "./Collectable";

export default class HealthPotion extends Collectable{
    constructor(game,x,y){
        super(game, x, y, 64, 64)
        this.color = "red"
        super.adjustHitbox(18, 10)
        super.changeSprite(12,1,12,1)
    }
    
    pickUp(){ 
        if (!this.game.gameOver)
        if (this.game.player.hp <5)
            this.game.player.hp++
        else this.game.scoreCounter += 4;
        this.markedForDeletion = true;
    }
}