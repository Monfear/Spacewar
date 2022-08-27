// drawImage(image, sx?, sy?, sWidth?, sHeight?, dx, dy, dWidth, dHeight);

import { loadFont } from './utils';

import { Vehicles, EnemiesSpeeds, Icons, Obstacles } from './types';

import { Spaceship } from './Spaceship';
import { Enemy } from './Enemy';
import { Explosion } from './Explosion';
import { Bullet } from './Bullet';
import { Icon } from './Icon';
import { Backdrop } from './Backdrop';
import { Obstacle } from './Obstacle';

export class Game {
    private canvas: HTMLCanvasElement = document.querySelector('[data-canvas]') as HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    private spaceship: Spaceship = new Spaceship(this.canvas, this.ctx);

    private backdrop: Backdrop = new Backdrop();

    private enemies: Enemy[] = [];
    private explosions: Explosion[] = [];
    private obstacles: Obstacle[] = [];

    private bigEnemyRespawnCounter: number = 0;
    private bigEnemyRespawnConstraint: number = 3;

    private respawnEnemyIntervalId: NodeJS.Timer | null = null;
    private respawnEnemyTime: number = 3000;

    private respawnObstacleIntervalId: NodeJS.Timer | null = null;
    private respawnObstacleTime: number = (Math.floor(Math.random() * 8) + 6) * 1000;

    private timerIntervalId: NodeJS.Timer | null = null;
    private timerValue: number = 1;
    private timerTime: number = 1000;

    private marginX: number = 30;
    private marginY: number = 50;

    private score: number = 0;

    private seconds: number = 0;
    private minutes: number = 0;

    private hpIcons: Icon[] = [];
    private shieldIcons: Icon[] = [];

    constructor() {
        this.setCanvasDimensions();

        loadFont();
        this.setAudiowideFont();

        this.initGameLoop();

        // this.spaceship.init();

        // this.createEnemies();
        this.initEnemy();

        // this.initObstacle();
        // this.createObstacles();

        this.setTimer();

        this.createIcons();

        // this.createShield();

        // >>>>>>>>>>>
        this.test();
    }

    test(): void {}

    private setCanvasDimensions(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    private initGameLoop = (): void => {
        // looping
        requestAnimationFrame(this.initGameLoop);

        // clear
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // spaceship
        if (this.spaceship.lives > 0) {
            this.spaceship.draw();
            this.spaceship.setMovement();
            this.spaceship.drawBullets();
        }

        // enemies
        this.drawEnemies();

        // explosions
        this.drawExplosions();

        // shot collisions
        this.checkShotColisions();

        // obstacles
        if (this.obstacles.length > 0) {
            this.drawObstacles();
        }

        // points
        this.drawPoints();

        // timer
        this.drawTimer();

        // icons
        this.hpIcons.forEach((icon) => {
            icon.draw();
        });

        this.shieldIcons.forEach((icon) => {
            icon.draw();
        });

        // shield
        if (typeof this.spaceship.x === 'number' && typeof this.spaceship.y === 'number' && typeof this.spaceship.frameWidth === 'number') {
            if (this.spaceship.isShieldActive) {
                this.shieldIcons.pop();
                this.spaceship.shield.draw(this.spaceship.x, this.spaceship.y, this.spaceship.frameWidth);
            }
        }
    };

    private setAudiowideFont(): void {
        this.ctx.font = '34px Audiowide';
        this.ctx.fillStyle = 'white';
    }

    private drawPoints(): void {
        this.ctx.fillText('Score: ' + this.score, this.marginX, this.marginY);
    }

    private setTimer(): void {
        this.timerIntervalId = setInterval(() => {
            this.seconds += this.timerValue;

            if (this.seconds > 59) {
                this.seconds = 0;
                this.minutes += this.timerValue;
            }
        }, this.timerTime);
    }

    private drawTimer(): void {
        let scoreText: string = `${this.minutes < 10 ? '0' + this.minutes : this.minutes}:${this.seconds < 10 ? '0' + this.seconds : this.seconds}`;

        let scoreTextWidth: number = this.ctx.measureText(scoreText).width;

        this.ctx.fillText(scoreText, this.canvas.width / 2 - scoreTextWidth / 2, this.marginY);
    }

    private createIcons(): void {
        const shiftX: number = 50;
        const shiftY: number = 50;

        for (let i = 0; i < this.spaceship.lives; i++) {
            const hpIcon: Icon = new Icon(this.canvas, this.ctx, i * shiftX, 0, Icons.live);
            hpIcon.init();

            this.hpIcons.push(hpIcon);
        }

        for (let i = 0; i < this.spaceship.shields; i++) {
            const shieldIcon: Icon = new Icon(this.canvas, this.ctx, i * shiftX - 5, shiftY, Icons.barrier);
            shieldIcon.init();

            this.shieldIcons.push(shieldIcon);
        }
    }

    private initEnemy(): void {
        const enemy: Enemy = new Enemy(this.canvas, this.pickRandomEnemy());

        enemy.img.addEventListener('load', () => {
            enemy.specifyDimensions();

            // position
            enemy.x = enemy._randomPositionX;

            if (typeof enemy.frameHeight === 'number') {
                enemy.y = -enemy.frameHeight / 2;
            }

            // step
            if (enemy.numOfEnemy === Vehicles.enemySmallOne) {
                enemy.dy = EnemiesSpeeds.enemySmallOne;
            } else if (enemy.numOfEnemy === Vehicles.enemySmallTwo) {
                enemy.dy = EnemiesSpeeds.enemySmallTwo;
            } else if (enemy.numOfEnemy === Vehicles.enemyBigOne) {
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
            if (enemy.numOfEnemy === Vehicles.enemyBigOne) {
                enemy.shiftY = 25;
            } else if (enemy.numOfEnemy === Vehicles.enemySmallOne || enemy.numOfEnemy === Vehicles.enemySmallTwo) {
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

            // collision with spaceship
            if (typeof enemy.y === 'number' && typeof enemy.x === 'number' && typeof enemy.frameHeight === 'number' && typeof this.spaceship.y === 'number' && typeof this.spaceship.x === 'number' && typeof this.spaceship.frameWidth === 'number' && typeof this.spaceship.frameHeight === 'number' && typeof enemy.frameWidth === 'number') {
                if (enemy.y + enemy.frameHeight - enemy.shiftY >= this.spaceship.y && enemy.x + enemy.frameWidth >= this.spaceship.x && enemy.x <= this.spaceship.x + this.spaceship.frameWidth) {
                    arr.splice(idx, 1);

                    if (!this.spaceship.isShieldActive) {
                        this.spaceship.lives--;
                        this.hpIcons.pop();
                        this.backdrop.wink();
                    }

                    if (typeof enemy.x === 'number' && typeof enemy.y === 'number') {
                        this.initExplosion(enemy.x, enemy.y, enemy.numOfEnemy);
                    }

                    if (this.spaceship.lives <= 0) {
                        this.initExplosion(this.spaceship.x - this.spaceship.frameWidth, this.spaceship.y - this.spaceship.frameHeight / 2, Vehicles.player);

                        this.endGame();
                    }
                }
            }
        });
    }

    private createEnemies(): void {
        this.respawnEnemyIntervalId = setInterval(() => {
            this.initEnemy();
        }, this.respawnEnemyTime);
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

    checkShotColisions(): void {
        // bullets
        this.spaceship.bullets.forEach((bullet: Bullet, bulletIdx: number, bulletsArr: Bullet[]): void => {
            // enemies
            this.enemies.forEach((enemy: Enemy, enemyIdx: number, enemiesArr: Enemy[]): void => {
                if (typeof bullet.y === 'number' && typeof bullet.x === 'number' && typeof bullet.frameHeight === 'number' && typeof bullet.frameWidth === 'number' && typeof enemy.x === 'number' && typeof enemy.frameWidth === 'number' && typeof enemy.y === 'number' && typeof enemy.frameHeight === 'number') {
                    if (bullet.x + bullet.frameWidth / 2 > enemy.x && bullet.x + bullet.frameWidth / 2 < enemy.x + enemy.frameWidth && bullet.y + bullet.frameHeight / 1.5 < enemy.y + enemy.frameHeight && bullet.y + bullet.frameHeight > enemy.y) {
                        if (typeof enemy.lifes === 'number') {
                            enemy.lifes--;
                            bulletsArr.splice(bulletIdx, 1);

                            if (enemy.lifes <= 0) {
                                this.initExplosion(enemy.x, enemy.y, enemy.numOfEnemy);
                                enemiesArr.splice(enemyIdx, 1);

                                if (typeof enemy.points === 'number') {
                                    this.score += enemy.points;
                                }
                            }
                        }
                    }
                }
            });
        });
    }

    pickRandomEnemy(): number {
        const numOfEnemies: number = Object.keys(Vehicles).length / 2 - 1;
        const randomNum: number = Math.floor(Math.random() * numOfEnemies + 1);

        if (randomNum === Vehicles.enemyBigOne) {
            this.bigEnemyRespawnCounter++;

            if (this.bigEnemyRespawnCounter === this.bigEnemyRespawnConstraint) {
                this.bigEnemyRespawnCounter = 0;

                return Vehicles.enemyBigOne;
            } else {
                return Vehicles.enemySmallOne;
            }
        } else {
            return randomNum;
        }
    }

    initObstacle(): void {
        const numOfObstacles: number = Object.keys(Obstacles).length / 2;
        const randomNum: number = Math.floor(Math.random() * numOfObstacles) + 1;
        let chosenObstacle: number;

        if (randomNum === 1) {
            chosenObstacle = Obstacles.asteroid;
        } else if (randomNum === 2) {
            chosenObstacle = Obstacles.bomb;
        } else if (randomNum === 3) {
            chosenObstacle = Obstacles.health;
        } else {
            chosenObstacle = 0;
        }

        const obstacle: Obstacle = new Obstacle(chosenObstacle, this.canvas);

        obstacle.img.addEventListener('load', (): void => {
            obstacle.specifyDimensions();

            obstacle.x = obstacle._randomPositionX;

            if (typeof obstacle.frameHeight === 'number') {
                obstacle.y = -obstacle.frameHeight;
            }

            this.obstacles.push(obstacle);
        });
    }

    drawObstacles(): void {
        this.obstacles.forEach((obstacle: Obstacle, idx: number, arr: Obstacle[]): void => {
            // increase speed counter
            obstacle.speedCounter++;

            // increase current frame based on counter
            if (obstacle.speedCounter > obstacle.speedConstraint) {
                obstacle.speedCounter = 0;
                obstacle.currentFrame++;
            }

            // reset current frame
            if (typeof obstacle.totalFrames === 'number') {
                if (obstacle.currentFrame >= obstacle.totalFrames) {
                    obstacle.currentFrame = 0;
                }
            }

            // starting cut point
            if (typeof obstacle.frameWidth === 'number') {
                obstacle.sx = obstacle.currentFrame * obstacle.frameWidth;
            }

            // increase y
            // if (this.isMovingTest) {
            // <<<<<<<<<<<<<<
            if (typeof obstacle.y === 'number' && typeof obstacle.velY === 'number') {
                obstacle.y += obstacle.velY;
                // }
            }

            // delete off the screen
            if (typeof obstacle.y === 'number') {
                if (obstacle.y > this.canvas.height) {
                    arr.splice(idx, 1);
                }
            }

            if (typeof obstacle.x === 'number' && typeof obstacle.y === 'number' && typeof obstacle.frameWidth === 'number' && typeof obstacle.frameHeight === 'number' && typeof obstacle.sx === 'number') {
                this.ctx.drawImage(obstacle.img, obstacle.sx, obstacle.sy, obstacle.frameWidth, obstacle.frameHeight, obstacle.x, obstacle.y, obstacle.frameWidth, obstacle.frameHeight);
            }

            // collision with spaceship
            if (typeof obstacle.y === 'number' && typeof obstacle.frameHeight === 'number' && typeof this.spaceship.y === 'number' && typeof obstacle.x === 'number' && typeof obstacle.frameWidth === 'number' && typeof this.spaceship.x === 'number' && typeof this.spaceship.frameWidth === 'number' && typeof obstacle.shiftY === 'number' && typeof obstacle.shiftX === 'number') {
                if (obstacle.y + obstacle.frameHeight - obstacle.shiftY >= this.spaceship.y && obstacle.x + obstacle.shiftX <= this.spaceship.x + this.spaceship.frameWidth && obstacle.x + obstacle.frameWidth - obstacle.shiftX >= this.spaceship.x) {
                    // this.isMovingTest = false;

                    arr.splice(idx, 1);

                    if (obstacle.kind === Obstacles.health) {
                        this.spaceship.lives++;
                        this.createIcons();
                    } else if (obstacle.kind === Obstacles.asteroid || obstacle.kind === Obstacles.bomb) {
                        for (let i = 0; i < 2; i++) {
                            this.spaceship.lives--;
                            this.hpIcons.pop();
                            this.backdrop.wink();
                        }
                    }
                }
            }
        });
    }

    private createObstacles(): void {
        this.respawnObstacleIntervalId = setInterval(() => {
            this.initObstacle();
        }, this.respawnObstacleTime);
    }

    endGame(): void {
        console.log('koniec');

        if (this.respawnEnemyIntervalId) {
            clearInterval(this.respawnEnemyIntervalId);
        }

        if (this.timerIntervalId) {
            clearInterval(this.timerIntervalId);
        }

        this.enemies.forEach((enemy: Enemy, idx, arr) => {
            if (typeof enemy.x === 'number' && typeof enemy.y === 'number') {
                this.initExplosion(enemy.x, enemy.y, enemy.numOfEnemy);

                while (arr.length !== 0) {
                    arr.pop();
                }
            }
        });
    }
}
