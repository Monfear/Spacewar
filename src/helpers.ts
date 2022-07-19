export function loadFont() {
    let myFont = new FontFace('Audiowide', 'url(./../fonts/Audiowide-Regular.ttf)');

    myFont.load().then((font) => {
        document.fonts.add(font);
    });
}
