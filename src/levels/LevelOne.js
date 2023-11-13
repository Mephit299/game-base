import Map from "../Map";
import Platform from "../Platform";
import Zombie from "../zombie";
import HealthPotion from "../healthPotion";
import NextLevelTrigger from "../NextLevelTrigger";

export default class levelOne extends Map {
    constructor(game){
        super(game, 900, 500)
        this.game = game;

        this.addPlatform(new Platform(game, -100, 430, 4000, 70, true, true))
        this.addPlatform(new Platform(game, 540, 300, 200, 20, true, false))
        this.addPlatform(new Platform(game, 200, 300, 200, 20, true, false))
        this.addPlatform(new Platform(game, 300, 180, 200, 20, true , false))
        this.enemies = []
    }
    generateEnemies(enemies){
        enemies = [];
        enemies.push(new Zombie(this.game, 350 , 235),
            new Zombie(this.game,500,365), 
            new HealthPotion(this.game, 350 , 236),
            new NextLevelTrigger(this.game,1400,400))
            return(enemies);
    }

}