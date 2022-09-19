import { Result } from './types';

export class LeaderboardScreen {
    private mainLeaderboardElement: HTMLDivElement = document.querySelector('[data-leaderboard]')! as HTMLDivElement;
    private leaderboardContentElement: HTMLDivElement = document.querySelector('[data-leaderboardContent]')! as HTMLDivElement;
    private menuBtn: HTMLButtonElement = document.querySelector('[data-menuBtn]')! as HTMLButtonElement;
    private exit2Btn: HTMLButtonElement = document.querySelector('[data-exit2Btn]')! as HTMLButtonElement;

    private url: string = 'https://spacewar-ranking-default-rtdb.firebaseio.com/players.json';
    private playersResults: Result[] = [];

    constructor() {
        this.setupListeners();
        this.renderResults();

        this.mainLeaderboardElement.classList.remove('hide');
    }

    private setupListeners(): void {
        this.menuBtn.addEventListener('click', () => {
            window.location.reload();
        });

        this.exit2Btn.addEventListener('click', () => {
            const link: string = 'https://letmegooglethat.com/?q=game+over+wiki';
            const target: string = '_self';

            window.open(link, target);
        });
    }

    private async renderResults(): Promise<void> {
        let resultsContent: string = '';

        try {
            const response: Response = await fetch(this.url);

            if (!response.ok) {
                throw new Error('data has not been fetched successfully');
            }

            const data = await response.json();

            for (const key in data) {
                this.playersResults.push({
                    name: data[key].name,
                    score: data[key].score,
                });
            }

            this.playersResults.sort((a: Result, b: Result): number => {
                return b.score - a.score;
            });

            this.playersResults.forEach((result, idx, arr): void => {
                if (idx < 5) {
                    const resultElement = `
                    <div class="leaderboard__content__result">
                        <p class="leaderboard__content__result__place">${idx + 1}.&nbsp;</p>
                        <p class="leaderboard__content__result__name">${result.name}&nbsp;</p>
                        <p class="leaderboard__content__result__points">${result.score} points</p>
                    </div>
                `;

                    resultsContent += resultElement;
                }
            });

            this.leaderboardContentElement.innerHTML = resultsContent;
        } catch (error) {
            if (error instanceof Error) {
                console.warn(error.message);
            }
        } finally {
            // pass
        }
    }
}
