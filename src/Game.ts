// drawImage(image, sx?, sy?, sWidth?, sHeight?, dx, dy, dWidth, dHeight);

import { Spaceship } from './Spaceship';

export class Game {
    private canvas: HTMLCanvasElement = document.querySelector('[data-canvas]') as HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    private spaceship: Spaceship = new Spaceship(this.canvas);

    constructor() {
        this.setCanvasDimensions();

        this.initSpaceship();

        this.initGameLoop();
    }

    private setCanvasDimensions(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    private initGameLoop = (): void => {
        // loop
        requestAnimationFrame(this.initGameLoop);

        // clear
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // spaceship
        this.drawSpaceship();
        this.spaceship.setMovement();
    };

    private initSpaceship(): void {
        this.spaceship.img.addEventListener('load', () => {
            this.spaceship.specifyDimensions();

            this.spaceship.x = this.canvas.width / 2 - this.spaceship.frameWidth / 2;
            this.spaceship.y = this.canvas.height - this.spaceship.height + 20;
        });
    }

    private drawSpaceship(): void {
        // drawImage(image, sx?, sy?, sWidth?, sHeight?, dx, dy, dWidth, dHeight);
        this.spaceship.speedCounter++;

        if (this.spaceship.speedCounter > this.spaceship.speedConstraint) {
            this.spaceship.speedCounter = 0;
            this.spaceship.currentFrame++;
        }

        if (this.spaceship.currentFrame === this.spaceship.totalFrames) {
            this.spaceship.currentFrame = 0;
        }

        this.spaceship.sx = this.spaceship.currentFrame * this.spaceship.frameWidth;

        this.ctx.drawImage(this.spaceship.img, this.spaceship.sx, 0, this.spaceship.frameWidth, this.spaceship.height, this.spaceship.x, this.spaceship.y, this.spaceship.frameWidth, this.spaceship.height);
    }
}
