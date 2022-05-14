// drawImage(image, sx?, sy?, sWidth?, sHeight?, dx, dy, dWidth, dHeight);

import { Enemies } from './types';

import { Spaceship } from './Spaceship';
import { Enemy } from './Enemy';

export class Game {
    private canvas: HTMLCanvasElement = document.querySelector('[data-canvas]') as HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    private spaceship: Spaceship = new Spaceship(this.canvas, this.ctx);
    private enemies: Enemy[] = [];

    constructor() {
        this.setCanvasDimensions();
        this.initGameLoop();

        this.initSpaceship();

        this.initEnemy();
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
        this.spaceship.drawBullets();

        // enemies
        this.drawEnemies();
    };

    private initSpaceship(): void {
        this.spaceship.img.addEventListener('load', () => {
            this.spaceship.specifyDimensions();

            this.spaceship.x = this.canvas.width / 2 - this.spaceship.frameWidth / 2;
            this.spaceship.y = this.canvas.height - this.spaceship.height + 40;
        });
    }

    private drawSpaceship(): void {
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

    private initEnemy(): void {
        const enemy: Enemy = new Enemy(this.canvas, Enemies.enemySmallOne);

        enemy.img.addEventListener('load', () => {
            enemy.specifyDimensions();

            // position
            const randomPosition = enemy._randomPositionX;

            enemy.x = randomPosition;

            if (typeof enemy.frameHeight === 'number') {
                enemy.y = -enemy.frameHeight / 2;
            }

            // step
            if (enemy.numOfEnemy === Enemies.enemySmallOne) {
                enemy.dy = 1;
            }

            // add to array
            this.enemies.push(enemy);
        });
    }

    private drawEnemies(): void {
        // drawImage(image, sx?, sy?, sWidth?, sHeight?, dx, dy, dWidth, dHeight);

        this.enemies.forEach((enemy, idx, arr) => {
            enemy.speedCounter++;

            // regulate speed
            if (enemy.speedCounter > enemy.speedConstraint) {
                enemy.speedCounter = 0;
                enemy.currentFrame++;
            }

            // reset current frame
            if (typeof enemy.totalFrames === 'number') {
                if (enemy.currentFrame >= enemy.totalFrames) {
                    enemy.currentFrame = 0;
                }
            }

            // starting cut point
            if (typeof enemy.frameWidth === 'number') {
                enemy.sx = enemy.currentFrame * enemy.frameWidth;
            }

            // increase y
            if (typeof enemy.y === 'number') {
                enemy.y += enemy.dy;

                // console.log('canvas', this.canvas.height);
                // console.log('y', enemy.y);
            }

            // delete off the screen
            if (typeof enemy.y === 'number' && typeof enemy.frameHeight === 'number') {
                if (enemy.y > this.canvas.height - enemy.frameHeight) {
                    enemy.y = this.canvas.height - enemy.frameHeight;
                }
            }

            // console.log(enemy.y);

            if (typeof enemy.x === 'number' && typeof enemy.y === 'number' && typeof enemy.frameWidth === 'number' && typeof enemy.frameHeight === 'number') {
                this.ctx.drawImage(enemy.img, enemy.sx, enemy.sy, enemy.frameWidth, enemy.frameHeight, enemy.x, enemy.y, enemy.frameWidth, enemy.frameHeight);
            }
        });
    }
}
