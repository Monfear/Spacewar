import { Game } from './Game';
import { audios } from './utils';

export class StartScreen {
    private canvasElement: HTMLCanvasElement = document.querySelector('[data-canvas]')! as HTMLCanvasElement;
    private mainScreenElement: HTMLDivElement = document.querySelector('[data-startScreen]')! as HTMLDivElement;
    private menuElement: HTMLDivElement = document.querySelector('[data-menu]')! as HTMLDivElement;

    private startBtn: HTMLButtonElement = document.querySelector('[data-startBtn]')! as HTMLButtonElement;
    private exitBtn: HTMLButtonElement = document.querySelector('[data-exitBtn]')! as HTMLButtonElement;
    private soundBtn: HTMLButtonElement = document.querySelector('[data-soundBtn]')! as HTMLButtonElement;

    private counterElement: HTMLHeadingElement = document.querySelector('[data-counter]')! as HTMLHeadingElement;

    constructor() {
        this.hideCanvas();
        this.setupListeners();

        audios.startingAudio.loop = true;
    }

    private setupListeners(): void {
        this.startBtn.addEventListener('click', (): void => {
            audios.clickAudio.play();
            audios.clickAudio.currentTime = 0;

            if (!audios.startingAudio.paused) {
                audios.startingAudio.pause();
            }

            this.startGame();
        });

        this.exitBtn.addEventListener('click', (): void => {
            audios.clickAudio.play();
            audios.clickAudio.currentTime = 0;

            this.exitGame();
        });

        this.soundBtn.addEventListener('click', (): void => {
            this.toggleStartMusic();
        });
    }

    private hideCanvas(): void {
        this.canvasElement.style.display = 'none';
    }

    private showCanvas(): void {
        this.canvasElement.style.display = 'block';
    }

    private toggleStartMusic(): void {
        const className = 'hideLine';

        if (!this.soundBtn.classList.contains(className)) {
            this.soundBtn.classList.add(className);
            audios.startingAudio.play();
        } else {
            this.soundBtn.classList.remove(className);
            audios.startingAudio.pause();
        }
    }

    private startGame(): void {
        this.menuElement.style.display = 'none';

        let opacity: number = 1;
        this.mainScreenElement.style.opacity = String(opacity);

        const intervalId = setInterval(() => {
            opacity -= 0.2;

            this.mainScreenElement.style.opacity = String(opacity);

            if (opacity <= 0) {
                clearInterval(intervalId);

                this.mainScreenElement.remove();
                this.showCanvas();

                this.canvasElement.width = window.innerWidth;
                this.canvasElement.height = window.innerHeight;

                this.countToStart();
            }
        }, 500);
    }

    private exitGame(): void {
        const link: string = 'https://letmegooglethat.com/?q=game+over+wiki';
        const target: string = '_self';

        window.open(link, target);
    }

    private countToStart(): void {
        audios.counterAudio.playbackRate = 1.1;
        audios.counterAudio.volume = 0.5;
        audios.counterAudio.play();

        let counter: number = 5;

        this.counterElement.innerText = String(counter);

        const intervalId = setInterval(() => {
            counter--;
            this.counterElement.innerText = String(counter);

            if (counter < 0) {
                clearInterval(intervalId);

                const text: string = 'Start';
                this.counterElement.innerText = text;

                this.counterElement.animate(
                    [
                        {
                            opacity: 1,
                            transform: 'scale(1) translate(-50%, -50%)',
                        },
                        {
                            opacity: 0,
                            transform: 'scale(10) translate(-50%, -50%)',
                        },
                    ],
                    {
                        duration: 1000,
                        iterations: 1,
                        fill: 'forwards',
                    }
                );

                setTimeout(() => {
                    audios.counterAudio.pause();
                    this.counterElement.remove();

                    audios.gameAudio.loop = true;
                    audios.gameAudio.volume = 0.3;
                    // audios.gameAudio.play();

                    new Game();
                }, 1000);
            }
        }, 1000);
    }
}
