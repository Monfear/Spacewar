import { LeaderboardScreen } from './LeaderboardScreen';
import { Result } from './types';

export class ResultScreen {
    private mainResultElement: HTMLDivElement = document.querySelector('[data-result]')! as HTMLDivElement;
    private scoreElement: HTMLSpanElement = document.querySelector('[data-score]')! as HTMLSpanElement;
    private formElement: HTMLFormElement = document.querySelector('[data-form]')! as HTMLFormElement;
    private errorElement: HTMLParagraphElement = document.querySelector('[data-error]')! as HTMLParagraphElement;

    private url: string = 'https://spacewar-ranking-default-rtdb.firebaseio.com/players.json';

    constructor(private score: number) {
        this.setupListeners();

        this.scoreElement.innerText = `>> ${this.score} <<`;
    }

    private setupListeners(): void {
        this.formElement.addEventListener('submit', (e: SubmitEvent) => {
            e.preventDefault();

            if (e.target) {
                if (e.target instanceof HTMLElement && e.target.children[1] instanceof HTMLInputElement) {
                    let userName: string = e.target.children[1].value;

                    if (!(userName.length >= 3)) {
                        this.errorElement.classList.remove('mask');
                    } else {
                        this.errorElement.classList.add('mask');
                        // this.addResult(userName, this.score);
                        this.moveToLeaderboard();
                    }
                }
            }
        });
    }

    private async addResult(name: string, score: number): Promise<void> {
        const result: Result = {
            name,
            score,
        };

        try {
            const response: Response = await fetch(this.url, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(result),
            });

            if (!response.ok) {
                throw new Error('data has not been sent successfully');
            }
        } catch (error) {
            if (error instanceof Error) {
                console.warn(error.message);
            }
        }
    }

    private moveToLeaderboard(): void {
        this.mainResultElement.classList.add('hide');
        this.mainResultElement.remove();

        new LeaderboardScreen();
    }
}
