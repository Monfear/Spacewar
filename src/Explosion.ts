import { Vehicles, Explosions } from './types';

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

    constructor(public numOfVehicle: number) {
        this.setImgSrc();
        this.adjustToAlly();
    }

    setImgSrc() {
        if (this.numOfVehicle === Vehicles.enemySmallOne || this.numOfVehicle == Vehicles.enemySmallTwo) {
            this.img.src = require('./../img/explosion-small_sprites.png');
        } else if (this.numOfVehicle === Vehicles.enemyBigOne) {
            this.img.src = require('./../img/explosion-big_sprites.png');
        } else if (this.numOfVehicle === Vehicles.player) {
            this.img.src = require('./../img/spaceship-explosion_sprites.png');
        } else {
            console.warn('wrong num of enemy');
        }
    }

    adjustToAlly(): void {
        if (this.numOfVehicle === Vehicles.player) {
            this.totalFrames = 9;
            this.speedConstraint = 10;
        }
    }

    specifyDimensions() {
        this.width = this.img.width;
        this.height = this.img.height;

        this.frameWidth = this.img.width / this.totalFrames;
        this.frameHeight = this.img.height;
    }
}
