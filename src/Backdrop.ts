export class Backdrop {
    public backdropElement: HTMLDivElement = document.createElement('div');

    private color: string = 'rgba(156, 8, 8, 0.35)';

    constructor() {
        this.setStyles();
        window.document.body.append(this.backdropElement);

        this.hide();
    }

    setStyles(): void {
        this.backdropElement.style.width = '100vw';
        this.backdropElement.style.height = '100vh';
        this.backdropElement.style.backgroundColor = this.color;
        this.backdropElement.style.position = 'absolute';
        this.backdropElement.style.top = '0';
    }

    show(): void {
        this.backdropElement.style.display = 'block';
    }

    hide(): void {
        this.backdropElement.style.display = 'none';
    }

    wink(): void {
        this.show();

        setTimeout(() => {
            this.hide();
        }, 200);
    }
}
