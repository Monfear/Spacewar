import { Bullet } from './Bullet';

export class Spaceship {
    public img: HTMLImageElement = new Image();

    public width: number | undefined = undefined;
    public height: number | undefined = undefined;

    public frameWidth: number | undefined = undefined;
    public frameHeight: number | undefined = undefined;

    public currentFrame: number = 0;
    public totalFrames: number = 6;

    public speedCounter: number = 0;
    public speedConstraint: number = 5;

    public x: number | undefined = undefined;
    public y: number | undefined = undefined;

    public dx: number = 10;
    public dy: null = null;

    public sx: number | undefined = undefined;
    public sy: number = 0;

    public shiftY: number = 40;

    public isArrowRight: boolean = false;
    public isArrowLeft: boolean = false;

    public bullets: Bullet[] = [];

    constructor(private canvas: HTMLCanvasElement, private ctx: CanvasRenderingContext2D) {
        this.img.src = require('./../img/spaceship_sprites.png');

        this.setMovementListeners();
        this.setShotListener();
    }

    public init(): void {
        this.img.addEventListener('load', () => {
            this.specifyDimensions();

            // starting position
            if (typeof this.frameWidth === 'number' && typeof this.height === 'number') {
                this.x = this.canvas.width / 2 - this.frameWidth / 2;
                this.y = this.canvas.height - this.height + this.shiftY;
            }
        });
    }

    public specifyDimensions(): void {
        this.width = this.img.width;
        this.height = this.img.height;

        this.frameWidth = this.img.width / this.totalFrames;
        this.frameHeight = this.img.height;
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
                this.initBullet();
            }
        });
    }

    public draw(): void {
        // increase constraint counter
        this.speedCounter++;

        // regulate speed frames
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

        // draw
        if (typeof this.frameWidth === 'number' && typeof this.frameHeight === 'number' && typeof this.x === 'number' && typeof this.y === 'number' && typeof this.sx === 'number') {
            this.ctx.drawImage(this.img, this.sx, this.sy, this.frameWidth, this.frameHeight, this.x, this.y, this.frameWidth, this.frameHeight);
        }
    }

    private handleKeys(e: KeyboardEvent, isActive: boolean): void {
        if (e.key === 'ArrowRight' || e.code === 'ArrowRight') {
            this.isArrowRight = isActive;
        } else if (e.key === 'ArrowLeft' || e.code === 'ArrowLeft') {
            this.isArrowLeft = isActive;
        }
    }

    public setMovement(): void {
        if (typeof this.frameWidth === 'number' && typeof this.x === 'number') {
            if (this.isArrowRight && this.x < this.canvas.width - this.frameWidth) {
                this.x += this.dx;
            } else if (this.isArrowLeft && this.x > 0) {
                this.x -= this.dx;
            }
        }
    }

    initBullet(): void {
        const bullet = new Bullet();

        bullet.img.addEventListener('load', () => {
            bullet.specifyDimensions();

            // position x y
            if (typeof this.frameWidth === 'number' && typeof this.x === 'number' && typeof this.y === 'number' && typeof bullet.height === 'number' && typeof bullet.frameWidth === 'number') {
                const posX: number = this.x + this.frameWidth / 2 - bullet.frameWidth / 2;
                const posY: number = this.y - bullet.height + bullet.shiftY;

                bullet.x = posX;
                bullet.y = posY;

                // add to array
                this.bullets.push(bullet);
            }
        });
    }

    drawBullets(): void {
        this.bullets.forEach((bullet, idx, arr) => {
            // increase constraint counter
            bullet.speedCounter++;

            // regulate speed frames
            if (bullet.speedCounter > bullet.speedConstraint) {
                bullet.currentFrame++;
                bullet.speedCounter = 0;
            }

            // reset current frame
            if (bullet.currentFrame >= bullet.totalFrames) {
                bullet.currentFrame = 0;
            }

            // starting cut point
            if (typeof bullet.frameWidth === 'number') {
                bullet.sx = bullet.currentFrame * bullet.frameWidth;
            }

            // increase y
            if (typeof bullet.y === 'number') {
                bullet.y += bullet.dy;
            }

            // draw
            if (typeof bullet.height === 'number' && typeof bullet.frameWidth === 'number' && typeof bullet.frameHeight === 'number' && typeof bullet.x === 'number' && typeof bullet.y === 'number' && typeof bullet.sx === 'number') {
                this.ctx.drawImage(bullet.img, bullet.sx, bullet.sy, bullet.frameWidth, bullet.frameHeight, bullet.x, bullet.y, bullet.frameWidth, bullet.frameHeight);
            }

            // // delete off the screen
            if (typeof bullet.height === 'number' && typeof bullet.y === 'number') {
                if (bullet.y + bullet.height <= 0) {
                    arr.splice(idx, 1);
                }
            }
        });
    }
}
