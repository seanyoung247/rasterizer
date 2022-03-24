
class rasterizer {
    constructor(screen) {
        this.screen = screen;
        this.ctx = screen.getContext("2d");
    }

    putPixel() {}
    drawLine() {}
    drawTriangle() {}
}

export {rasterizer}