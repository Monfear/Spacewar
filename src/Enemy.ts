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

    // public dx: number = 5; tylko w jednym rodzaju
    public dy: number = 5; // zalezne od rodzaju

    public sx: number = 0;
    public sy: number = 0;

    constructor(private canvas: HTMLCanvasElement, public numOfEnemy: number) {
        this.setImgSrc();
    }

    setImgSrc(): void {
        if (this.numOfEnemy === 1) {
            this.img.src = require('./../img/enemy_1_sprites.png');
        } else if (this.numOfEnemy === 2) {
            this.img.src = require('./../img/enemy_2_sprites.png');
        } else if (this.numOfEnemy === 3) {
            this.img.src = require('./../img/enemy_3_sprites.png');
        }
    }

    public specifyDimensions(): void {
        this.width = this.img.width;
        this.height = this.img.height;

        if (this.numOfEnemy === 1) {
            this.totalFrames = 8;
        } else if (this.numOfEnemy === 2) {
            this.totalFrames = 5;
        } else if (this.numOfEnemy === 3) {
            this.totalFrames = 8;
        } else {
            console.warn('wrong num of enemy');
        }

        if (this.totalFrames) {
            this.frameWidth = this.img.width / this.totalFrames;
            this.frameHeight = this.img.height;
        }
    }

    get _randomPositionX() {
        if (typeof this.frameWidth === 'number') {
            return Math.floor(Math.random() * (this.canvas.width - this.frameWidth));
        }
    }
}
