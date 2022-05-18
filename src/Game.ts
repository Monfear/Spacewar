// drawImage(image, sx?, sy?, sWidth?, sHeight?, dx, dy, dWidth, dHeight);

import { Enemies, EnemiesSpeeds } from './types';

import { Spaceship } from './Spaceship';
import { Enemy } from './Enemy';
import { Explosion } from './Explosion';

export class Game {
    private canvas: HTMLCanvasElement = document.querySelector('[data-canvas]') as HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    private spaceship: Spaceship = new Spaceship(this.canvas, this.ctx);

    private enemies: Enemy[] = [];

    private explosions: Explosion[] = [];

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

        // explosions
        this.drawExplosions();

        // collisons
        this.checkColisions();
    };

    private initSpaceship(): void {
        this.spaceship.img.addEventListener('load', () => {
            this.spaceship.specifyDimensions();

            // starting position
            if (typeof this.spaceship.frameWidth === 'number' && typeof this.spaceship.height === 'number') {
                this.spaceship.x = this.canvas.width / 2 - this.spaceship.frameWidth / 2;
                this.spaceship.y = this.canvas.height - this.spaceship.height + 40;
            }
        });
    }

    private drawSpaceship(): void {
        // increase constraint counter
        this.spaceship.speedCounter++;

        // regulate speed frames
        if (this.spaceship.speedCounter > this.spaceship.speedConstraint) {
            this.spaceship.speedCounter = 0;
            this.spaceship.currentFrame++;
        }

        // reset current frame
        if (this.spaceship.currentFrame === this.spaceship.totalFrames) {
            this.spaceship.currentFrame = 0;
        }

        // starting cut point
        if (typeof this.spaceship.frameWidth === 'number') {
            this.spaceship.sx = this.spaceship.currentFrame * this.spaceship.frameWidth;
        }

        // draw
        if (typeof this.spaceship.frameWidth === 'number' && typeof this.spaceship.frameHeight === 'number' && typeof this.spaceship.x === 'number' && typeof this.spaceship.y === 'number' && typeof this.spaceship.sx === 'number') {
            this.ctx.drawImage(this.spaceship.img, this.spaceship.sx, this.spaceship.sy, this.spaceship.frameWidth, this.spaceship.frameHeight, this.spaceship.x, this.spaceship.y, this.spaceship.frameWidth, this.spaceship.frameHeight);
        }
    }

    private initEnemy(): void {
        const enemy: Enemy = new Enemy(this.canvas, Enemies.enemySmallOne);

        enemy.img.addEventListener('load', () => {
            enemy.specifyDimensions();

            // position
            enemy.x = enemy._randomPositionX;

            if (typeof enemy.frameHeight === 'number') {
                enemy.y = -enemy.frameHeight / 2;
            }

            // step
            if (enemy.numOfEnemy === Enemies.enemySmallOne) {
                enemy.dy = EnemiesSpeeds.enemySmallOne;
            } else if (enemy.numOfEnemy === Enemies.enemySmallTwo) {
                enemy.dy = EnemiesSpeeds.enemySmallTwo;
            } else if (enemy.numOfEnemy === Enemies.enemyBigOne) {
                enemy.dy = EnemiesSpeeds.enemyBigOne;
            }

            // add to array
            this.enemies.push(enemy);
        });
    }

    private drawEnemies(): void {
        this.enemies.forEach((enemy, idx, arr) => {
            // increase constraint counter
            enemy.speedCounter++;

            // regulate speed frames
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
            if (typeof enemy.y === 'number' && typeof enemy.dy === 'number') {
                enemy.y += enemy.dy;
            }

            // draw
            if (typeof enemy.x === 'number' && typeof enemy.y === 'number' && typeof enemy.frameWidth === 'number' && typeof enemy.frameHeight === 'number' && typeof enemy.sx === 'number') {
                this.ctx.drawImage(enemy.img, enemy.sx, enemy.sy, enemy.frameWidth, enemy.frameHeight, enemy.x, enemy.y, enemy.frameWidth, enemy.frameHeight);
            }

            // adjust y position
            if (enemy.numOfEnemy === Enemies.enemyBigOne) {
                enemy.shiftY = 25;
            } else if (enemy.numOfEnemy === Enemies.enemySmallOne || enemy.numOfEnemy === Enemies.enemySmallTwo) {
                enemy.shiftY = 0;
            }

            // delete off the screen
            if (typeof enemy.y === 'number' && typeof enemy.frameHeight === 'number') {
                if (enemy.y > this.canvas.height - enemy.frameHeight + enemy.shiftY) {
                    enemy.y = this.canvas.height - enemy.frameHeight;

                    arr.splice(idx, 1);

                    if (typeof enemy.x === 'number' && typeof enemy.y === 'number') {
                        this.initExplosion(enemy.x, enemy.y, enemy.numOfEnemy);
                    }
                }
            }
        });
    }

    initExplosion(x: number, y: number, numOfEnemy: number): void {
        const explosion: Explosion = new Explosion(numOfEnemy);

        explosion.img.addEventListener('load', () => {
            explosion.specifyDimensions();

            explosion.x = x;
            explosion.y = y;

            this.explosions.push(explosion);
        });
    }

    drawExplosions(): void {
        // drawImage(image, sx?, sy?, sWidth?, sHeight?, dx, dy, dWidth, dHeight);

        this.explosions.forEach((explosion, idx, arr) => {
            // increase constraint counter
            explosion.speedCounter++;

            // regulate speed frames
            if (explosion.speedCounter > explosion.speedConstraint) {
                explosion.speedCounter = 0;
                explosion.currentFrame++;
            }

            // delete after one loop
            if (explosion.currentFrame >= explosion.totalFrames) {
                arr.splice(idx, 1);
                // explosion.currentFrame = 0;
            }

            // starting cut point
            if (typeof explosion.frameWidth === 'number') {
                explosion.sx = explosion.currentFrame * explosion.frameWidth;
            }

            // draw
            if (typeof explosion.frameWidth === 'number' && typeof explosion.frameHeight === 'number' && typeof explosion.sx === 'number' && typeof explosion.x === 'number' && typeof explosion.y === 'number') {
                this.ctx.drawImage(explosion.img, explosion.sx, explosion.sy, explosion.frameWidth, explosion.frameHeight, explosion.x, explosion.y, explosion.frameWidth, explosion.frameHeight);
            }
        });
    }

    checkColisions(): void {
        // bullets
        this.spaceship.bullets.forEach((bullet, bulletIdx, bulletsArr) => {
            // enemies
            this.enemies.forEach((enemy, enemyIdx, enemiesArr) => {
                if (typeof bullet.y === 'number' && typeof bullet.x === 'number' && typeof bullet.frameHeight === 'number' && typeof bullet.frameWidth === 'number' && typeof enemy.x === 'number' && typeof enemy.frameWidth === 'number' && typeof enemy.y === 'number' && typeof enemy.frameHeight === 'number') {
                    if (bullet.x + bullet.frameWidth / 2 > enemy.x && bullet.x + bullet.frameWidth / 2 < enemy.x + enemy.frameWidth && bullet.y + bullet.frameHeight / 1.5 < enemy.y + enemy.frameHeight && bullet.y + bullet.frameHeight > enemy.y) {
                        bulletsArr.splice(bulletIdx, 1);
                        enemiesArr.splice(enemyIdx, 1);
                    }
                }
            });
        });
    }

    pickRandomEnemy(): void {
        console.log(Object.keys(Enemies).length / 2);
    }
}

// if (bullet.y < enemy.y + enemy.frameHeight && bullet.y + bullet.frameHeight > enemy.y) {
//     console.log('os y');
// }
