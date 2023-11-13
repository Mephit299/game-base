import background1 from './assets/sprites/Background_Ersboda.png';
import Middleground from './assets/sprites/Middleground_Ersboda.png';
import Foreground from './assets/sprites/Foreground_Ersboda.png';
import ForegroundTile from './assets/sprites/Foreground_Ersboda_använbartGolv.png';

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

        const foregorundTile = new  Image();
        foregorundTile.src = ForegroundTile;
        this.foregorundTile = foregorundTile;

        this.width = 440;
        this.height = 128;

        this.width2  = 171;

    }

    draw(context){
        context.drawImage(this.background,  1500, -562, this.width *4, this.height *4)
        context.drawImage(this.background,  0, -562, this.width *4, this.height *4)
        context.drawImage(this.background,  1500, -50, this.width *4, this.height *4)
        context.drawImage(this.background,  0, -50, this.width *4, this.height *4)
        context.drawImage(this.middleground,  0, 230, this.width *2, this.height *2)
        context.drawImage(this.middleground,  800, 230, this.width *2, this.height *2)
        context.drawImage(this.middleground,  1700, 230, this.width *2, this.height *2)
        context.drawImage(this.middleground,  2500, 230, this.width *2, this.height *2)
        context.drawImage(this.foregorund, 0, 0, this.width - 220, this.height,  0, 0, (this.width -220) * 4, this.height *4)
        context.drawImage(this.foregorundTile,  880, 0, this.width2 * 4, this.height *4)
        context.drawImage(this.foregorund, 60, 0, this.width -60, this.height,  1564, 0, (this.width -60) * 4, this.height *4)
        context.drawImage(this.foregorundTile,  3084, 0, this.width2 * 4, this.height *4)


    }

}