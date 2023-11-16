import Map from "../Map";
import Platform from "../Platform";
import Zombie from "../zombie";
import HealthPotion from "../healthPotion";
import NextLevelTrigger from "../NextLevelTrigger";
import Ghost from "../Ghost";

export default class levelOne extends Map {
    constructor(game){
        super(game, 2400, 500)
        this.game = game;

        this.addPlatform(new Platform(game, -100, 430, 4000, 70, true, true))
        this.addPlatform(new Platform(game, 1240, 300, 200, 20, true, false))
        this.addPlatform(new Platform(game, 750, 300, 200, 20, true, false))
        this.addPlatform(new Platform(game, 1000, 180, 200, 20, true , false))
        this.addPlatform(new Platform(game, 2490, 270, 180, 20, true, true))
        this.addPlatform(new Platform(game, 2855, 270, 180, 20, true, true))
        this.enemies = []
    }
    generateEnemies(enemies){
        enemies = [];
        enemies.push(new Zombie(this.game, 900 , 235),
            new Zombie(this.game,1100,365), 
            new Zombie(this.game, 1340, 235),
            new Zombie(this.game,2550,200),
            new Ghost(this.game, 1800, 365, 250),
            new Ghost(this.game, 2730, 365, 220),
            new HealthPotion(this.game, 1070 , 140),
            new NextLevelTrigger(this.game,2900,210))
            return(enemies);
    }

}