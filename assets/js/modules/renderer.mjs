/**
 * Helper function to convert an RGB(A) color into a 32bit one
 * @param red Red color channel
 * @param green Green color channel
 * @param blue Blue color channel
 * @param alpha (optional) Alpha channel
 */
export function RGBA(red, green, blue, alpha = 255) {
    return ( (red << 24) | (green << 16) | (blue << 8) | alpha );
}

/**
 * Encapsulates a colour in RGBA format
 */
export class Color {
    static channels = {
        red: 0, green: 1, blue: 2, alpha: 3,
        r: 0, g: 1, b: 2, a: 3
    }
    /**
     * Creates a new RGBA object
     * @param color 32bit color code in RGBA format (Optional)
     */
    constructor(color = 0xFF) {
        this._buffer = new ArrayBuffer(4);
        this._channels = new Uint8Array(this._buffer);
        this._color = new Uint32Array(this._buffer);

        this.color = color;
    }

    /**
     * Accepts a 32bit color in RGBA format
     */
    set color(color) {
        this._channels[0] = (color >> 24) & 0xFF;
        this._channels[1] = (color >> 16) & 0xFF;
        this._channels[2] = (color >> 8) & 0xFF;
        this._channels[3] = color & 0xFF;
    }
    get color() {
        return this._color[0];
    }

    // Accessors
    get red() {return this._channels[0];}
    set red(val) {this._channels[0] = val;}
    get green() {return this._channels[1];}
    set green(val) {this._channels[1] = val;}
    get blue() {return this._channels[2];}
    set blue(val) {this._channels[2] = val;}
    get alpha() {return this._channels[3];}
    set alpha(val) {this._channels[3] = val;}

    _hexC(ch) {
        return this._channels[ch].toString(16).padStart(2, '0');
    }
    /**
     * Returns the color in css Hex string format
     * @returns String color in hex format
     */
    cssHex() {
        return ('#' + this._hexC(0) + this._hexC(1) + this._hexC(2));
    }
    /**
     * Returns the color in css hex string format with alpha channel
     * @returns String color in hex format
     */
    cssHexA() {
        return ('#' + this._hexC(0) + this._hexC(1) + this._hexC(2) + this._hexC(3));
    }
    /**
     * Returns the color in css RGB() format
     * @returns String RGB
     */
    cssRGB() {
        return `rgb(${this._channels[0]},${this._channels[1]},${this._channels[2]})`;
    }
    /**
     * Returns the color in css RGBA() format
     * @returns String RGBA
     */
    cssRGBA() {
        return `rgba(${this._channels[0]},${this._channels[1]},${this._channels[2]},${this._channels[3]})`;
    }

    /**
     * Sets the color from a hex string
     * @param str Hex string
     */
    fromString(str) {
        // If there's a leading # remove it.
        if (str[0] === '#') str = str.substring(1);
        this.color = parseInt( 
            // Does the string provided have an alpha channel?
            ((str.length > 6) ? str + 'FF' : str ), 16
        );
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
     * Draws a line between two points of the specified color using Brenshams algorithm
     *  @param x1 - The x coordinate of the line starting point
     *  @param y1 - The y coordinate of the line starting point
     *  @param x2 - The x coordinate of the line ending point
     *  @param y2 - The y coordinate of the line ending point
     *  @param color - Color object defining color of line
     */
    drawLine(x1, y1, x2, y2, color) {
        // Workout delta changes for each step
        let deltaX = Math.abs(x2 - x1);
        let deltaY = Math.abs(y2 - y1);
        // Step distance
        let stepX = Math.sign(x2 - x1);
        let stepY = Math.sign(y2 - y1);
        // Initialise step error to line slope
        let error = deltaX - deltaY;
        
        while (true) {
            this.putPixel(x1, y1, color);
            // Reached end point?
            if ((x1 === x2) && (y1 === y2)) break;
            
            const e2 = error * 2;
            // Next step is closer to X
            if (e2 > -deltaY) {
                error -= deltaY;
                x1 += stepX;
            }
            // Next step is closer to Y
            if (e2 < deltaX) {
                error += deltaX;
                y1 += stepY;
            }
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
