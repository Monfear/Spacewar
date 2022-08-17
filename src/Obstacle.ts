import { Obstacles } from './types';

export class Obstacle {
    public img: HTMLImageElement = new Image();

    public width: number | undefined = undefined;
    public height: number | undefined = undefined;
    public frameWidth: number | undefined = undefined;
    public frameHeight: number | undefined = undefined;

    public currentFrame: number = 0;
    public totalFrames: number | undefined = undefined;

    public x: number | undefined = undefined;
    public y: number | undefined = undefined;
    public velY: number | undefined = undefined;

    public sx: number = 0;
    public sy: number = 0;

    public speedCounter: number = 0;
    public speedConstraint: number = 8;

    public shiftY: number | undefined = undefined;
    public shiftX: number | undefined = undefined;

    constructor(private kind: string, private canvas: HTMLCanvasElement) {
        this.setImgSrc();
        this.setVelocity();
        this.setShifts();
    }

    setImgSrc(): void {
        if (this.kind === Obstacles.asteroid) {
            this.img.src = require('./../img/asteroids_sprites.png');
        } else if (this.kind === Obstacles.bomb) {
            this.img.src = require('./../img/bombs_sprites.png');
        } else {
            console.warn('wrong enum');
        }
    }

    specifyDimensions(): void {
        this.width = this.img.width;
        this.height = this.img.height;

        if (this.kind === Obstacles.asteroid) {
            this.totalFrames = 5;
        } else if (this.kind === Obstacles.bomb) {
            this.totalFrames = 2;
        } else {
            console.warn('wrong enum');
        }

        if (typeof this.totalFrames === 'number') {
            this.frameHeight = this.img.height;
            this.frameWidth = this.img.width / this.totalFrames;
        }
    }

    setVelocity(): void {
        if (this.kind === Obstacles.asteroid) {
            this.velY = 2;
        } else if (this.kind === Obstacles.bomb) {
            this.velY = 1;
        }
    }

    setShifts(): void {
        if (this.kind === Obstacles.asteroid) {
            this.shiftY = 40;
            this.shiftX = 30;
        } else if (this.kind === Obstacles.bomb) {
            this.shiftY = 25;
            this.shiftX = 25;
        }
    }

    get _randomPositionX() {
        if (typeof this.frameWidth === 'number') {
            return Math.floor(Math.random() * (this.canvas.width - this.frameWidth));
        }
    }
}
