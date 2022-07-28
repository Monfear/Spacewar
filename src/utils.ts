export function loadFont(): void {
    let myFont: FontFace = new FontFace('Audiowide', 'url(./../fonts/Audiowide-Regular.ttf)');

    myFont.load().then((font) => {
        document.fonts.add(font);
    });
}
