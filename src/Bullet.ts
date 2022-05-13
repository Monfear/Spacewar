export class Bullet {
    public img: HTMLImageElement = new Image();

    public width: number = 0;
    public height: number = 0;

    public frameWidth: number = 0;
    public currentFrame: number = 0;
    public totalFrames: number = 8;

    public speedCounter: number = 0;
    public speedConstraint: number = 5;

    public x: number = 0;
    public y: number = 0;
    public dy: number = -5;

    public sx: number = 0;

    public shiftY: number = 7;

    constructor() {
        this.img.src = require('./../img/bullet_sprites.png');

        this.img.addEventListener('load', () => {
            this.specifyDimensions();
        });
    }

    specifyDimensions() {
        this.width = this.img.width;
        this.height = this.img.height;
        this.frameWidth = this.img.width / this.totalFrames;
    }
}
