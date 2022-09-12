export class Shield {
    public img: HTMLImageElement = new Image();

    public width: number | undefined = undefined;
    public height: number | undefined = undefined;
    public frameWidth: number | undefined = undefined;
    public frameHeight: number | undefined = undefined;

    public currentFrame: number = 0;
    public totalFrames: number = 16;

    public x: number | undefined = undefined;
    public y: number | undefined = undefined;

    public sx: number = 0;
    private sy: number = 0;

    private shiftY = 50;

    private speedCounter: number = 0;
    private speedConstraint: number = 4;

    public activationTime: number = 2000;

    constructor(private ctx: CanvasRenderingContext2D) {
        this.setImgSrc();
        this.init();
    }

    private setImgSrc(): void {
        this.img.src = require('./../img/shield_sprites.png');
    }

    private specifyDimensions(): void {
        this.width = this.img.width;
        this.height = this.img.height;

        this.frameWidth = this.width / this.totalFrames;
        this.frameHeight = this.height;
    }

    public init(): void {
        this.img.addEventListener('load', () => {
            this.specifyDimensions();

            this.x = 0;
            this.y = 0;
        });
    }

    public draw(spaceshipX: number, spaceshipY: number, spaceshipFrameWidth: number): void {
        const coords: {
            x: number;
            y: number;
        } = {
            x: spaceshipX - spaceshipFrameWidth / 3,
            y: spaceshipY - this.shiftY,
        };

        // increase counter
        this.speedCounter++;

        // increase current frame
        if (this.speedCounter > this.speedConstraint) {
            this.speedCounter = 0;
            this.currentFrame++;
        }

        // reset current frame
        if (this.currentFrame === this.totalFrames) {
            this.currentFrame = 0;
        }

        // starting cut point
        if (typeof this.frameWidth === 'number') {
            this.sx = this.currentFrame * this.frameWidth;
        }

        if (typeof this.x === 'number' && typeof this.y === 'number' && typeof this.frameWidth === 'number' && typeof this.frameHeight === 'number') {
            this.ctx.drawImage(this.img, this.sx, this.sy, this.frameWidth, this.frameHeight, coords.x, coords.y, this.frameWidth, this.frameHeight);
        }
    }
}
