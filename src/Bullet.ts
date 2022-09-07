export class Bullet {
    public img: HTMLImageElement = new Image();

    public width: number | undefined = undefined;
    public height: number | undefined = undefined;

    public frameWidth: number | undefined = undefined;
    public frameHeight: number | undefined = undefined;

    public currentFrame: number = 0;
    public totalFrames: number = 8;

    public speedCounter: number = 0;
    public speedConstraint: number = 5;

    public x: number | undefined = undefined;
    public y: number | undefined = undefined;

    public velY: number = -5;

    public sx: number | undefined = undefined;
    public sy: number = 0;

    public shiftY: number = 7;

    private audio: HTMLAudioElement = new Audio(require('url:./../audio/LaserShot.wav'));

    constructor() {
        this.img.src = require('./../img/bullet_sprites.png');

        this.audio.addEventListener('canplaythrough', () => {
            this.audio.play();
        });
    }

    public specifyDimensions() {
        this.width = this.img.width;
        this.height = this.img.height;

        this.frameWidth = this.img.width / this.totalFrames;
        this.frameHeight = this.img.height;
    }
}
