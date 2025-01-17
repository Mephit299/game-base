import Projectile from "./Projectile";
import MeleeAttack from "./MeleeAttack";
import spriteImage from './assets/sprites/Sprites_botten_av_rutorna.png';

export default class Player {
    constructor(game) {
        this.game = game;
        this.positionX = 50;
        this.positionY = 365;
        this.width = 64;
        this.height = 64;
        this.hp = 5;
        this.iFrames = 0;

        this.hitboxYMagicNumber = 7;
        this.hitboxXMagicNumber = 14;
        this.hitboxX = this.positionX + this.hitboxXMagicNumber;
        this.hitboxY = this.positionY + this.hitboxYMagicNumber;
        this.hitboxWidth = this.width - this.hitboxXMagicNumber * 2;
        this.hitboxHeight = this.height - this.hitboxYMagicNumber;

        this.speedX = 0;
        this.speedY = 0;
        this.maxSpeed = 5;
        this.jumpSpeed = 9.5;
        this.grounded = false;
        this.coyoteFrames = 0;
        this.direction = 1;

        this.hasGun = false;
        this.projectiles = [];
        this.ammo = 3;
        this.shootTimer = 0;
        this.fistAttackTimer = 0;

        const image = new Image();
        image.src = spriteImage;
        this.image = image;
        this.flip = false;

        this.frameX = 0
        this.frameY = 0
        this.maxFrame = 4
        this.fps = 12
        this.timer = 0
        this.interval = 1000 / this.fps

        this.idelmaxFrame = 1;
        this.idelFrameY = 0;

        this.runningMaxFrame = 4;
        this.runningFrameY = 0;

        this.jumpingMaxFrame = 6;
        this.jumpingFrameY = 1;
        this.jummping = false;

        this.attackMaxFrame = 4;
        this.attackFrameY = 2;

        this.lockMovment = false;
        this.lockMovmentTimer = 0;
        this.knockbackSpeedY = 4;
        this.knockbackSpeedX = 5;

    }

    update(deltaTime) {
        if (this.grounded)
            this.coyoteFrames = 5;
        else this.coyoteFrames--
        if (this.lockMovmentTimer >= 0)
            this.lockMovmentTimer--
        if (this.lockMovmentTimer <= 0)
            this.lockMovment = false
        if (!this.lockMovment) {
            if (this.game.keys.includes('ArrowLeft') || this.game.keys.includes('a')) {
                this.speedX = -this.maxSpeed;
                this.direction = 0;
                this.maxFrame = this.runningMaxFrame;
                this.frameY = this.runningFrameY;
            }
            else if (this.game.keys.includes(`ArrowRight`) || this.game.keys.includes('d')) {
                this.speedX = this.maxSpeed;
                this.direction = 1;
                this.maxFrame = this.runningMaxFrame;
                this.frameY = this.runningFrameY;
            }
            else {
                this.speedX = 0;
                if (this.grounded) {
                    this.maxFrame = this.idelmaxFrame;
                    this.frameY = 0;
                }
            }
            if (this.game.keys.includes('ArrowUp') && this.grounded || this.game.keys.includes('w') && this.coyoteFrames > 0 || this.game.keys.includes('ArrowUp') && this.coyoteFrames > 0 || this.game.keys.includes('w') && this.grounded) {
                this.speedY = -this.jumpSpeed;
                this.grounded = false;
                this.maxFrame = this.jumpingMaxFrame;
                this.frameY = this.jumpingFrameY;
                this.jummping = true;
            }
        }

        if (this.grounded) {
            this.speedY = 0
            this.jummping = false;
        } else {
            this.speedY += this.game.gravity
        }
        if (this.jummping) {
            this.maxFrame = this.jumpingMaxFrame;
            this.frameY = this.jumpingFrameY;
        }

        this.positionX += this.speedX;
        this.positionY += this.speedY;
        if (this.positionX <= 0)
            this.positionX = 0;
        this.hitboxX = this.positionX + this.hitboxXMagicNumber;
        this.hitboxY = this.positionY + this.hitboxYMagicNumber;




        this.projectiles.forEach((projectile) => {
            projectile.update(deltaTime)
            if (projectile.meleeAttack) {
                this.maxFrame = this.attackMaxFrame;
                this.frameY = this.attackFrameY;
            }
        })
        this.projectiles = this.projectiles.filter(
            (projectile) => !projectile.markedForDeletion
        )

        if (this.speedX < 0) {
            this.flip = true
        } else if (this.speedX > 0) {
            this.flip = false
        }

        if (this.timer > this.interval) {
            this.frameX++
            this.timer = 0
        } else {
            this.timer += deltaTime
        }

        // reset frameX when it reaches maxFrame
        if (this.frameX >= this.maxFrame) {
            this.frameX = 0
        }

        if (this.shootTimer > 0)
            this.shootTimer -= deltaTime
        if (this.fistAttackTimer > 0)
            this.fistAttackTimer -= deltaTime

        if (this.iFrames > 0)
            this.iFrames -= deltaTime;
    }


    draw(context) {
        this.projectiles.forEach((projectile) => { projectile.draw(context) })
        //context.fillStyle = "blue"
        //context.fillRect(this.positionX,this.positionY,this.width,this.height)

        if (this.flip) {
            context.save()
            context.scale(-1, 1)
        }

        context.drawImage(
            this.image,
            this.frameX * this.width,
            this.frameY * this.height,
            this.width,
            this.height,
            this.flip ? this.positionX * -1 - this.width : this.positionX,
            this.positionY,
            this.width,
            this.height
        )
        if (this.flip)
            context.restore()
        if (this.game.debug) {
            context.strokeRect(this.positionX, this.positionY, this.width, this.height)
            context.strokeRect(this.hitboxX, this.hitboxY, this.hitboxWidth, this.hitboxHeight)
        }

    }

    shoot() {
        if (this.ammo > 0 && this.shootTimer <= 0 && this.hasGun) {
            this.projectiles.push(
                new Projectile(this.game, this.positionX + this.width / 2, this.positionY + this.height / 2, this.direction)
            )
            this.ammo--
            this.shootTimer = 500;
        }
    }
    strike() {
        if (this.fistAttackTimer <= 0) {
            this.projectiles.push(new MeleeAttack(this.game, this.direction))
            this.fistAttackTimer = 600;
            this.frameX = 0;
            this.timer = 0;
        }
    }
    knockback(flip) {
        if (!flip)
            this.speedX = this.knockbackSpeedX
        else this.speedX = -this.knockbackSpeedX;
        this.speedY = -this.knockbackSpeedY;
        this.positionY -= 5;
        this.hitboxY -= 5;
        this.lockMovment = true
        this.lockMovmentTimer = 15;
    }

}