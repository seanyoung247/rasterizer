
class rasterizer {
    constructor(canvas) {
        this._canvas = screen;
        this._context = canvas.getContext("2d");
        this._buffer = null;
    }

    startFrame() {
        const width = this._canvas.clientWidth
        const height = this._canvas.clientHeight;
        this._context.canvas.width = width;
        this._context.canvas.height = height;
        // Generate an empty 32bit buffer for this frame
        this._buffer = new Uint32Array(width * height);
        //this._buffer = new Uint32Array(this._context.getImageData(0,0,width,height).data.buffer);
    }

        putPixel(x, y, colour) {
            
        }
        drawLine() {}
        drawTriangle() {}

    endFrame() {
        // Copy screen buffer back to screen
        this._context.putImageData(this._buffer,0,0);
        // Destroy temporary framebuffer
        this._buffer = null;
    }
}

export {rasterizer}