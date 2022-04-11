
class rasterizer {
    constructor(canvas) {
        this._canvas = canvas;
        this._context = canvas.getContext("2d");
        this._buffer = {
            image: null,
            pixels: null
        };
    }

    _inBounds(x,y,w,h) {
        return (x >= 0 && x < w && y >= 0 && y < h);
    }

    /**
     * Prepares for rendering a frame
     */
    startFrame() {
        // Ensure that the canvas pixel resolution matches the element size
        const width = this._canvas.clientWidth;
        const height = this._canvas.clientHeight;
        this._context.canvas.width = width;
        this._context.canvas.height = height;
        // Grab an image object for the canvas and an array object of the raw pixels
        this._buffer.image = this._context.getImageData(0,0,width,height);
        this._buffer.pixels = new Uint32Array(this._buffer.image.data.buffer);
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