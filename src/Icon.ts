// drawImage(image, sx?, sy?, sWidth?, sHeight?, dx, dy, dWidth, dHeight);

import { Icons } from './types';

export class Icon {
    public img: HTMLImageElement = new Image();

    public width: number | undefined = undefined;
    public height: number | undefined = undefined;

    private marginX: number = 75;
    private marginY: number = 20;

    constructor(private canvas: HTMLCanvasElement, private ctx: CanvasRenderingContext2D, private shiftX: number, private shiftY: number, private iconType: string) {
        if (this.iconType === Icons.live) {
            this.img.src = require('./../img/HP_Icon.png');
        } else if (this.iconType === Icons.barrier) {
            this.img.src = require('./../img/Armor_Icon.png');
        } else {
            console.warn('wrong icon type');
        }
    }

    setDimensions(): void {
        this.width = this.img.width;
        this.height = this.img.height;
    }

    init(): void {
        this.img.addEventListener('load', () => {
            this.setDimensions();
        });
    }

    draw(): void {
        if (typeof this.width === 'number' && typeof this.height === 'number') {
            this.ctx.drawImage(this.img, this.canvas.width - this.marginX - this.shiftX, this.marginY + this.shiftY, this.width, this.height);
        }
    }
}
