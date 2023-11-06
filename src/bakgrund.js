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
    draw(context){
        context.drawImage(this.background,  0, 0)
        context.drawImage(this.middleground,  0, 0)
        context.drawImage(this.foregorund,  0, 0)

    }

}