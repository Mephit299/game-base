import Map from "../Map";
import NextLevelTrigger from "../NextLevelTrigger";
import Platform from "../Platform";
import Vampire from "../Vampire";
import HealthPotion from "../healthPotion";
import Zombie from "../zombie";

export default class levelTwo extends Map {
    constructor(game){
        super(game, 1000, 500)
        this.game = game;

        this.addPlatform(new Platform(game, -100, 430, 4000, 70, true, true))
        this.addPlatform(new Platform(game, 300, 300, 200, 20, true, false))
        this.addPlatform(new Platform(game, 660, 180, 200, 20, true, false))
       // this.addPlatform(new Platform(game, 300, 300, 200, 20, true))
        //this.enemies = [new Zombie(game,700,400),
        //    new Zombie(game, 700,160),
        //    new Zombie(game, 1200, 350),
        //    new HealthPotion(game,760,140)]
    }
    generateEnemies(enemies){
        enemies = [];
        enemies.push(new Vampire(this.game,700,365),
            new Zombie(this.game, 700,120),
            new Zombie(this.game, 1200, 350),
            new HealthPotion(this.game,760,120),
            new NextLevelTrigger(this.game,1400,365))
            
            return(enemies);
    }

}