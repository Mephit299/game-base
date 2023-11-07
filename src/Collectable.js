import Enemy from "./Enemy"

export default class Collectable extends Enemy{
    constructor(game, x, y, width, height){
        super(game)
        this.isCollectable = true;
        this.hp = 3;
        this.score = 0;
        this.positionX = x;
        this.positionY = y;
        this.width = width;
        this.height = height;
        super.adjustHitbox(18, 10)
        
        
        this.frameY = 12;
        this.frameX = 0;


    }
    update(){
        this.hitboxX = this.positionX + this.hitboxXMagicNumber;
        this.hitboxY = this.positionY + this.hitboxYMagicNumber;
    }

    pickup(){
        this.markedForDeletion = true;
    }

    knockback(){}
}