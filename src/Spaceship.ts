// drawImage(image, sx?, sy?, sWidth?, sHeight?, dx, dy, dWidth, dHeight);

export class Spaceship {
    public img: HTMLImageElement = new Image();
    public width: number = 0;
    public height: number = 0;
    public frameWidth: number = 0;

    public totalFrames: number = 6;
    public currentFrame: number = 0;

    public speedCounter: number = 0;
    public speedConstraint: number = 5;

    public x: number = 0;
    public y: number = 0;
    public dx: number = 10;

    public sx: number = 0;

    public isArrowRight: boolean = false;
    public isArrowLeft: boolean = false;

    constructor(private canvas: HTMLCanvasElement) {
        this.img.src = require('./../img/spaceship_sprites.png');

        this.setMovementListeners();
    }

    private setMovementListeners(): void {
        window.document.body.addEventListener('keydown', (e: KeyboardEvent) => {
            this.handleKeys(e, true);
        });

        window.document.body.addEventListener('keyup', (e: KeyboardEvent) => {
            this.handleKeys(e, false);
        });
    }

    public specifyDimensions(): void {
        this.width = this.img.width;
        this.height = this.img.height;
        this.frameWidth = this.img.width / this.totalFrames;
    }

    private handleKeys(e: KeyboardEvent, isActive: boolean): void {
        if (e.key === 'ArrowRight' || e.code === 'ArrowRight') {
            this.isArrowRight = isActive;
        } else if (e.key === 'ArrowLeft' || e.code === 'ArrowLeft') {
            this.isArrowLeft = isActive;
        }
    }

    public setMovement() {
        if (this.isArrowRight && this.x < this.canvas.width - this.frameWidth) {
            this.x += this.dx;
        } else if (this.isArrowLeft && this.x > 0) {
            this.x -= this.dx;
        }
    }
}
