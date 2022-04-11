/**
 * Encapsulates a colour in RGBA format
 */
export class Color {
    static channels = {
        red: 0, green: 1, blue: 2, alpha: 3
    }
    /**
     * Creates a new RGBA object
     * @param color 32bit color code in ARGB format (Optional)
     */
    constructor(color = 0xFF000000) {
        this._buffer = new ArrayBuffer(4);
        this._channels = new Uint8Array(this._buffer);
        this._color = new Uint32Array(this._buffer);

        this.color = color;
    }

    set color(color) {
        this._channels[0] = (color >> 16) & 0xFF;
        this._channels[1] = (color >> 8) & 0xFF;
        this._channels[2] = color & 0xFF;
        this._channels[3] = (color >> 24) & 0xFF;
    }
    get color() {
        return this._color[0];
    }
}
/**
 * Renders 2D graphics to a canvas element
 */
export class Renderer {
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
        // Grab an image object for the canvas and a typed array object of the raw pixels
        this._buffer.image = this._context.getImageData(0,0,width,height);
        this._buffer.pixels = new Uint32Array(this._buffer.image.data.buffer);
    }

    /**
     * Sets the colour of a single pixel to colour
     * @param x - The x coordinate of the pixel
     * @param y - The y coordinate of the pixel
     * @param color - Color object defining color of pixel
     */
    putPixel(x, y, color) {
        const width = this._canvas.clientWidth;
        const height = this._canvas.clientHeight;
        if (this._inBounds(x,y,width,height)) {
            const index = x + (y * width);
            this._buffer.pixels[index] = color.color;
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
