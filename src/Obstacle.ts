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

    public kind: number = 0;

    constructor(private canvas: HTMLCanvasElement) {
        this.setKind();
        this.setImgSrc();
        this.setVelocity();
        this.setShifts();
    }

    private setKind(): void {
        const numOfObstacles: number = Object.keys(Obstacles).length / 2;
        const randomNum: number = Math.floor(Math.random() * numOfObstacles) + 1;
        let chosenObstacle: number;

        if (randomNum === 1) {
            chosenObstacle = Obstacles.asteroid;
        } else if (randomNum === 2) {
            chosenObstacle = Obstacles.bomb;
        } else if (randomNum === 3) {
            chosenObstacle = Obstacles.health;
        } else {
            chosenObstacle = 0;
        }

        this.kind = chosenObstacle;
    }

    private setImgSrc(): void {
        if (this.kind === Obstacles.asteroid) {
            this.img.src = require('./../img/asteroids_sprites.png');
        } else if (this.kind === Obstacles.bomb) {
            this.img.src = require('./../img/bombs_sprites.png');
        } else if (this.kind === Obstacles.health) {
            this.img.src = require('./../img/health.png');
        } else {
            console.warn('no img set');
        }
    }

    public specifyDimensions(): void {
        this.width = this.img.width;
        this.height = this.img.height;

        if (this.kind === Obstacles.asteroid) {
            this.totalFrames = 5;
        } else if (this.kind === Obstacles.bomb) {
            this.totalFrames = 2;
        } else if (this.kind === Obstacles.health) {
            this.totalFrames = 1;
        } else {
            console.warn('no dimensions set');
        }

        if (typeof this.totalFrames === 'number') {
            this.frameHeight = this.img.height;
            this.frameWidth = this.img.width / this.totalFrames;
        }
    }

    private setVelocity(): void {
        if (this.kind === Obstacles.asteroid) {
            this.velY = 3;
        } else if (this.kind === Obstacles.bomb) {
            this.velY = 2;
        } else if (this.kind === Obstacles.health) {
            this.velY = 3;
        } else {
            console.warn('no velocity set');
        }
    }

    private setShifts(): void {
        if (this.kind === Obstacles.asteroid) {
            this.shiftY = 40;
            this.shiftX = 30;
        } else if (this.kind === Obstacles.bomb) {
            this.shiftY = 25;
            this.shiftX = 30;
        } else if (this.kind === Obstacles.health) {
            this.shiftY = 25;
            this.shiftX = 30;
        } else {
            console.warn('no shifts set');
        }
    }

    get _randomPositionX() {
        if (typeof this.frameWidth === 'number') {
            return Math.floor(Math.random() * (this.canvas.width - this.frameWidth));
        }
    }
}
