
class rasterizer {
    constructor(canvas) {
        this._canvas = screen;
        this._context = canvas.getContext("2d");
        this._buffer = null;
    }

    startFrame() {
        const width = canvas.clientWidth
        const height = canvas.clientHeight;
        this._context.canvas.width = width;
        this._context.canvas.height = height;
        // Get screen buffer
        this._buffer = this._context.getImageData(0,0,width,height);
    }
    putPixel() {}
    drawLine() {}
    drawTriangle() {}
    endFrame() {
        // Copy screen buffer back to screen
    }
}

export {rasterizer}