import { Vehicles, EnemiesFrames, EnemiesLifes, EnemiesSpeeds } from './types';

export class Enemy {
    public img: HTMLImageElement = new Image();

    public width: number | undefined = undefined;
    public height: number | undefined = undefined;

    public frameWidth: number | undefined = undefined;
    public frameHeight: number | undefined = undefined;

    public currentFrame: number = 0;
    public totalFrames: number | undefined = undefined;

    public speedCounter: number = 0;
    public speedConstraint: number = 3;

    public x: number | undefined = undefined;
    public y: number | undefined = undefined;

    public velY: number | undefined = undefined;

    public sx: number | undefined = undefined;
    public sy: number = 0;

    public shiftY: number = 25;

    public lifes: number | undefined = undefined;

    public points: number | undefined = undefined;

    constructor(private canvas: HTMLCanvasElement, public numOfEnemy: number) {
        this.setImgSrc();
        this.setLifes();
        this.setPoints();
        this.setVelocity();
        this.setShift();
    }

    private setImgSrc(): void {
        if (this.numOfEnemy === Vehicles.enemySmallOne) {
            this.img.src = require('./../img/enemy_1_sprites.png');
        } else if (this.numOfEnemy === Vehicles.enemySmallTwo) {
            this.img.src = require('./../img/enemy_2_sprites.png');
        } else if (this.numOfEnemy === Vehicles.enemyBigOne) {
            this.img.src = require('./../img/enemy_3_sprites.png');
        }
    }

    public specifyDimensions(): void {
        this.width = this.img.width;
        this.height = this.img.height;

        if (this.numOfEnemy === Vehicles.enemySmallOne) {
            this.totalFrames = EnemiesFrames.enemySmallOne;
        } else if (this.numOfEnemy === Vehicles.enemySmallTwo) {
            this.totalFrames = EnemiesFrames.enemySmallTwo;
        } else if (this.numOfEnemy === Vehicles.enemyBigOne) {
            this.totalFrames = EnemiesFrames.enemyBigOne;
        } else {
            console.warn('wrong enemy num');
        }

        if (typeof this.totalFrames === 'number') {
            this.frameWidth = this.img.width / this.totalFrames;
            this.frameHeight = this.img.height;
        }
    }

    private setLifes(): void {
        if (this.numOfEnemy === Vehicles.enemySmallOne) {
            this.lifes = EnemiesLifes.enemySmallOne;
        } else if (this.numOfEnemy === Vehicles.enemySmallTwo) {
            this.lifes = EnemiesLifes.enemySmallTwo;
        } else if (this.numOfEnemy === Vehicles.enemyBigOne) {
            this.lifes = EnemiesLifes.enemyBigOne;
        }
    }

    private setPoints(): void {
        if (this.numOfEnemy === Vehicles.enemySmallOne) {
            this.points = 10;
        } else if (this.numOfEnemy === Vehicles.enemySmallTwo) {
            this.points = 20;
        } else if (this.numOfEnemy === Vehicles.enemyBigOne) {
            this.points = 50;
        } else {
            console.warn('wrong enemy num');
        }
    }

    private setVelocity(): void {
        if (this.numOfEnemy === Vehicles.enemySmallOne) {
            this.velY = EnemiesSpeeds.enemySmallOne;
        } else if (this.numOfEnemy === Vehicles.enemySmallTwo) {
            this.velY = EnemiesSpeeds.enemySmallTwo;
        } else if (this.numOfEnemy === Vehicles.enemyBigOne) {
            this.velY = EnemiesSpeeds.enemyBigOne;
        }
    }

    private setShift(): void {
        if (this.numOfEnemy === Vehicles.enemyBigOne) {
            this.shiftY = 25;
        } else if (this.numOfEnemy === Vehicles.enemySmallOne || this.numOfEnemy === Vehicles.enemySmallTwo) {
            this.shiftY = 0;
        }
    }

    get randomPositionX() {
        if (typeof this.frameWidth === 'number') {
            return Math.floor(Math.random() * (this.canvas.width - this.frameWidth));
        }
    }
}
