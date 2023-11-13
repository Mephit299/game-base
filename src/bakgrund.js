import background1 from './assets/sprites/Background_Ersboda.png';
import Middleground from './assets/sprites/Middleground_Ersboda.png';
import Foreground from './assets/sprites/Foreground_Ersboda.png';

export default class Background{
    constructor(game){
        this.gae = game
        const background = new Image();
        background.src = background1;
        this.background = background;

        const middleground = new Image();
        middleground.src = Middleground;
        this.middleground = middleground;

        const foreground = new Image();
        foreground.src = Foreground;
        this.foregorund = foreground;

        this.width = 440;
        this.height = 128;

    }

    drawBackground(context){
        context.drawImage(this.background,  0, -50, this.width *4, this.height *4)
    }

    draw(context){
        context.drawImage(this.background,  0, -50, this.width *4, this.height *4)
        context.drawImage(this.middleground,  0, 230, this.width *2, this.height *2)
        context.drawImage(this.middleground,  800, 230, this.width *2, this.height *2)
        context.drawImage(this.foregorund,  0, 0, this.width * 4, this.height *4)

    }

}