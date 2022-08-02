import { Vehicles, EnemiesFrames, EnemiesLifes } from './types';
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

    public dy: number | undefined = undefined;

    public sx: number | undefined = undefined;
    public sy: number = 0;

    public shiftY: number = 25;

    public lifes: number | undefined = undefined;

    public points: number | undefined = undefined;

    constructor(private canvas: HTMLCanvasElement, public numOfEnemy: number) {
        this.setImgSrc();
        this.setLifes();
        this.setPoints();
    }

    setImgSrc(): void {
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

    setLifes(): void {
        if (this.numOfEnemy === Vehicles.enemySmallOne) {
            this.lifes = EnemiesLifes.enemySmallOne;
        } else if (this.numOfEnemy === Vehicles.enemySmallTwo) {
            this.lifes = EnemiesLifes.enemySmallTwo;
        } else if (this.numOfEnemy === EnemiesLifes.enemyBigOne) {
            this.lifes = EnemiesLifes.enemyBigOne;
        }
    }

    setPoints(): void {
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

    get _randomPositionX() {
        if (typeof this.frameWidth === 'number') {
            return Math.floor(Math.random() * (this.canvas.width - this.frameWidth));
        }
    }
}
