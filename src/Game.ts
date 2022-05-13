// drawImage(image, sx?, sy?, sWidth?, sHeight?, dx, dy, dWidth, dHeight);

import { Spaceship } from './Spaceship';

export class Game {
    private canvas: HTMLCanvasElement = document.querySelector('[data-canvas]') as HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    private spaceship: Spaceship = new Spaceship(this.canvas, this.ctx);

    constructor() {
        this.setCanvasDimensions();

        this.initSpaceship();

        // this.spaceship.initBullet();

        // ***********************
        // ***********************
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

        // bullet
        // console.log(this.spaceship.bullets);

        this.spaceship.drawBullets();
    };

    private initSpaceship(): void {
        this.spaceship.img.addEventListener('load', () => {
            this.spaceship.specifyDimensions();

            this.spaceship.x = this.canvas.width / 2 - this.spaceship.frameWidth / 2;
            this.spaceship.y = this.canvas.height - this.spaceship.height + 40;
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

    // private initBullet() {
    //     // drawImage(image, sx?, sy?, sWidth?, sHeight?, dx, dy, dWidth, dHeight);

    //     const bullet: Bullet = new Bullet(this.canvas);

    //     bullet.img.addEventListener('load', () => {
    //         bullet.specifyDimensions();

    //         this.bullets.push(bullet);
    //         this.bullets.push(bullet);
    //     });
    // }

    // private drawBullet() {
    //     console.log(this.bullets);

    //     this.bullets.forEach((bullet) => {
    //         this.ctx.drawImage(bullet.img, bullet.sx, 0, bullet.frameWidth, bullet.height, 0, 0, bullet.frameWidth, bullet.height);

    //         console.log(this.bullets);
    //     });
    // }
}
