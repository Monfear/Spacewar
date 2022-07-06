import { Enemies, EnemiesFrames, EnemiesLifes, EnemiesSpeeds } from './types';
import { Explosion } from './Explosion';

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

    constructor(private canvas: HTMLCanvasElement, public numOfEnemy: number) {
        this.setImgSrc();
        this.setLifes();
    }

    setImgSrc(): void {
        if (this.numOfEnemy === Enemies.enemySmallOne) {
            this.img.src = require('./../img/enemy_1_sprites.png');
        } else if (this.numOfEnemy === Enemies.enemySmallTwo) {
            this.img.src = require('./../img/enemy_2_sprites.png');
        } else if (this.numOfEnemy === Enemies.enemyBigOne) {
            this.img.src = require('./../img/enemy_3_sprites.png');
        }
    }

    public specifyDimensions(): void {
        this.width = this.img.width;
        this.height = this.img.height;

        if (this.numOfEnemy === Enemies.enemySmallOne) {
            this.totalFrames = EnemiesFrames.enemySmallOne;
        } else if (this.numOfEnemy === Enemies.enemySmallTwo) {
            this.totalFrames = EnemiesFrames.enemySmallTwo;
        } else if (this.numOfEnemy === Enemies.enemyBigOne) {
            this.totalFrames = EnemiesFrames.enemyBigOne;
        } else {
            console.warn('wrong num of enemy');
        }

        if (typeof this.totalFrames === 'number') {
            this.frameWidth = this.img.width / this.totalFrames;
            this.frameHeight = this.img.height;
        }
    }

    setLifes(): void {
        if (this.numOfEnemy === Enemies.enemySmallOne) {
            this.lifes = EnemiesLifes.enemySmallOne;
        } else if (this.numOfEnemy === Enemies.enemySmallTwo) {
            this.lifes = EnemiesLifes.enemySmallTwo;
        } else if (this.numOfEnemy === EnemiesLifes.enemyBigOne) {
            this.lifes = EnemiesLifes.enemyBigOne;
        }
    }

    get _randomPositionX() {
        if (typeof this.frameWidth === 'number') {
            return Math.floor(Math.random() * (this.canvas.width - this.frameWidth));
        }
    }
}
