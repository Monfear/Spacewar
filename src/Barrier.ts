// drawImage(image, sx?, sy?, sWidth?, sHeight?, dx, dy, dWidth, dHeight);

export class Barrier {
    public img: HTMLImageElement = new Image();

    public width: number | undefined = undefined;
    public height: number | undefined = undefined;
    public frameWidth: number | undefined = undefined;
    public frameHeight: number | undefined = undefined;

    public x: number | undefined = undefined;
    public y: number | undefined = undefined;

    public currentFrame: number | undefined = 0;
    public totalFrames: number = 16;

    constructor() {
        this.setImgSrc();
    }

    setImgSrc(): void {
        this.img.src = require('./../img/shield_sprites.png');
    }

    specifyDimensions(): void {
        this.width = this.img.width;
        this.height = this.img.height;

        this.frameWidth = this.width / this.totalFrames;
        this.frameHeight = this.height;
    }
}
