import { Enemies, Explosions } from './types';

export class Explosion {
    public img: HTMLImageElement = new Image();

    public width: number | undefined = undefined;
    public height: number | undefined = undefined;

    public frameWidth: number | undefined = undefined;
    public frameHeight: number | undefined = undefined;

    public currentFrame: number = 0;
    public totalFrames: number = 15;

    public speedCounter: number = 0;
    public speedConstraint: number = 3;

    public x: number | undefined = undefined;
    public y: number | undefined = undefined;

    public dx: null = null;
    public dy: null = null;

    public sx: number | undefined = undefined;
    public sy: number = 0;

    constructor(public numOfEnemy: number) {
        this.setImgSrc();
    }

    setImgSrc() {
        if (this.numOfEnemy === Enemies.enemySmallOne || this.numOfEnemy == Enemies.enemySmallTwo) {
            this.img.src = require('./../img/explosion-small_sprites.png');
            console.log('small');
            console.log(this.numOfEnemy);
        } else if (this.numOfEnemy === Enemies.enemyBigOne) {
            this.img.src = require('./../img/explosion-big_sprites.png');
        } else {
            console.warn('wrong num of enemy');
        }
    }

    specifyDimensions() {
        this.width = this.img.width;
        this.height = this.img.height;

        this.frameWidth = this.img.width / this.totalFrames;
        this.frameHeight = this.img.height;
    }
}
