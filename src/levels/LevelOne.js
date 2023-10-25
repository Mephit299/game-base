import Map from "../Map";
import Platform from "../Platform";
import Zombie from "../zombie";
import HealthPotion from "../healthPotion";
import NextLevelTrigger from "../NextLevelTrigger";

export default class levelOne extends Map {
    constructor(game){
        super(game, 1000, 500)
        this.game = game;

        this.addPlatform(new Platform(game, -100, 430, 4000, 70, true))
        this.addPlatform(new Platform(game, 540, 280, 200, 20, true))
        this.addPlatform(new Platform(game, 200, 280, 200, 20, true))
        this.addPlatform(new Platform(game, 300, 160, 200, 20, true))
        this.enemies = []
    }
    generateEnemies(enemies){
        enemies = [];
        enemies.push(new Zombie(this.game, 350 , 280),
            new Zombie(this.game,500,400), 
            new HealthPotion(this.game, 350 , 280),
            new NextLevelTrigger(this.game,1400,400))
            return(enemies);
    }

}