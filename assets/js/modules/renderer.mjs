/**
 * 
 */
class Renderer {
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

    /**
     * Sets the colour of a single pixel to colour
     * @param x - The x coordinate of the pixel
     * @param y - The y coordinate of the pixel
     * @param colour - 32Bit colour in ABGR format
     */
    putPixel(x, y, colour) {
        const width = this._canvas.clientWidth;
        const height = this._canvas.clientHeight;
        if (this._inBounds(x,y,width,height)) {
            const index = x + (y * width);
            this._buffer.pixels[index] = colour;
        }
    }

    /**
     * Completes a frame and shows it on-screen
     */
    endFrame() {
        // Copy screen buffer back to screen
        this._context.putImageData(this._buffer.image,0,0);
    }
}

export {rasterizer}