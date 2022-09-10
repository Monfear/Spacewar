import { Game } from './Game';

export class StartScreen {
    private canvasElement: HTMLCanvasElement = document.querySelector('[data-canvas]')! as HTMLCanvasElement;
    private mainScreenElement: HTMLDivElement = document.querySelector('[data-startScreen]')! as HTMLDivElement;
    private menuElement: HTMLDivElement = document.querySelector('[data-menu]')! as HTMLDivElement;

    private startBtn: HTMLButtonElement = document.querySelector('[data-startBtn]')! as HTMLButtonElement;
    private exitBtn: HTMLButtonElement = document.querySelector('[data-exitBtn]')! as HTMLButtonElement;
    private soundBtn: HTMLButtonElement = document.querySelector('[data-soundBtn]')! as HTMLButtonElement;

    private startingAudio: HTMLAudioElement = new Audio(require('url:./../audio/startingMusic.wav'));
    private clickAudio: HTMLAudioElement = new Audio(require('url:./../audio/ClickButton.wav'));

    constructor() {
        this.hideCanvas();
        this.setupListeners();

        this.startingAudio.loop = true;
    }

    private setupListeners(): void {
        this.startBtn.addEventListener('click', (): void => {
            this.clickAudio.play();
            this.clickAudio.currentTime = 0;

            this.startGame();
        });

        this.exitBtn.addEventListener('click', (): void => {
            this.clickAudio.play();
            this.clickAudio.currentTime = 0;

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
            this.startingAudio.play();
        } else {
            this.soundBtn.classList.remove(className);
            this.startingAudio.pause();
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

                this.mainScreenElement.style.display = 'none';
                this.showCanvas();

                new Game();
            }
        }, 500);
    }

    private exitGame(): void {
        const link: string = 'https://letmegooglethat.com/?q=game+over+wiki';
        const target: string = '_self';

        window.open(link, target);
    }
}
