import { Color } from './types/color.mjs';
import { Point2D, Vector2D } from './types/types2d.mjs';

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

    //
    // Helpers
    //

    // Checks a given x,y point is within the screen boundaries
    _inBounds(x,y,w,h) {
        return (x >= 0 && x < w && y >= 0 && y < h);
    }

    // Returns a point on a line at a given time
    _lerp() {}

    // 
    // Drawing code
    //

    /**
     * Prepares for rendering a frame
     *  @param clear - Boolean, should the screen be cleared?
     */
    startFrame(clear = false) {
        // Ensure that the canvas pixel resolution matches the element size
        const width = this._canvas.clientWidth;
        const height = this._canvas.clientHeight;
        this._context.canvas.width = width;
        this._context.canvas.height = height;
        
        if (clear) this._context.clearRect(0, 0, width, height);
        // Grab an image object for the canvas and a typed array object of the raw pixels
        this._buffer.image = this._context.getImageData(0, 0, width, height);
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
     *  @param x1 - The x screen coordinate of the line starting point
     *  @param y1 - The y screen coordinate of the line starting point
     *  @param x2 - The x screen coordinate of the line ending point
     *  @param y2 - The y screen coordinate of the line ending point
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

    drawTriangle(x1, y1, x2, y2, x3, y3) {

    }

    /**
     * Completes a frame and shows it on-screen
     */
    endFrame() {
        // Copy screen buffer back to screen
        this._context.putImageData(this._buffer.image,0,0);
    }
}
