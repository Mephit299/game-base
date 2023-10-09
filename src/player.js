export default class Player{
    constructor(game){
    this.game = game;
    this.positionX = 200;
    this.positionY = 200;
    this.speedX = 1;
    this.speedY = 0;
    this.hp = 0;

    }

    update(deltaTime){
        this.positionX += this.speedX;
        
       // if (event.keypress) {
       //     if (event.keypress === d)
       //         this.speedX = 5
       //     if(event.keypress === a)
       //         this.speedX = -5
       //     this.positionX += this.speedX;
       //     this.positionY += this.speedY
       // }
    }

    draw(context){
        context.begainPath();
        context.fillStyle = "blue"
        context.fillRect(this.positionX,this.positionY,50,50)
        context.closePath();
    }

    
}