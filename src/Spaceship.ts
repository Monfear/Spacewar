// drawImage(image, sx?, sy?, sWidth?, sHeight?, dx, dy, dWidth, dHeight);

import { Bullet } from './Bullet';

export class Spaceship {
    public img: HTMLImageElement = new Image();

    public width: number = 0;
    public height: number = 0;

    public frameWidth: number = 0;
    public currentFrame: number = 0;
    public totalFrames: number = 6;

    public speedCounter: number = 0;
    public speedConstraint: number = 5;

    public x: number = 0;
    public y: number = 0;
    public dx: number = 10;

    public sx: number = 0;

    public isArrowRight: boolean = false;
    public isArrowLeft: boolean = false;

    public bullets: Bullet[] = [];
    // private isBulletsLoaded: boolean = false;

    constructor(private canvas: HTMLCanvasElement, private ctx: CanvasRenderingContext2D) {
        this.img.src = require('./../img/spaceship_sprites.png');

        this.setMovementListeners();
        this.setShotListener();
    }

    private setMovementListeners(): void {
        window.document.body.addEventListener('keydown', (e: KeyboardEvent) => {
            this.handleKeys(e, true);
        });

        window.document.body.addEventListener('keyup', (e: KeyboardEvent) => {
            this.handleKeys(e, false);
        });
    }

    private setShotListener(): void {
        window.document.body.addEventListener('keyup', (e) => {
            if (e.key === ' ') {
                console.log('shot');
                this.initBullet();
            }
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

    public setMovement(): void {
        if (this.isArrowRight && this.x < this.canvas.width - this.frameWidth) {
            this.x += this.dx;
        } else if (this.isArrowLeft && this.x > 0) {
            this.x -= this.dx;
        }
    }

    initBullet(): void {
        const bullet = new Bullet();

        bullet.img.addEventListener('load', () => {
            bullet.specifyDimensions();

            const posX: number = this.x + this.frameWidth / 2 - bullet.frameWidth / 2;
            const posY: number = this.y - bullet.height + bullet.shiftY;

            bullet.x = posX;
            bullet.y = posY;

            this.bullets.push(bullet);
        });
    }

    drawBullets(): void {
        this.bullets.forEach((bullet, idx, arr) => {
            bullet.speedCounter++;

            if (bullet.speedCounter > bullet.speedConstraint) {
                bullet.currentFrame++;
                bullet.speedCounter = 0;
            }

            if (bullet.currentFrame >= bullet.totalFrames) {
                bullet.currentFrame = 0;
            }

            bullet.sx = bullet.currentFrame * bullet.frameWidth;
            bullet.y += bullet.dy;

            this.ctx.drawImage(bullet.img, bullet.sx, 0, bullet.frameWidth, bullet.height, bullet.x, bullet.y, bullet.frameWidth, bullet.height);

            if (bullet.y + bullet.height <= 0) {
                console.log(bullet.y);
                arr.splice(idx, 1);
            }
        });
    }
}
