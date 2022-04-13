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
     *  @param {Boolean} clear - Optional, default false. If true screen is cleared
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
     * @param {Object} p - Point2D defining the pixel coordinates
     * @param {Object} color - Color object defining color of pixel
     */
    putPixel(p, color) {
        const width = this._canvas.clientWidth;
        const height = this._canvas.clientHeight;
        if (this._inBounds(p.x, p.y, width, height)) {
            const index = p.x + (p.y * width);
            this._buffer.pixels[index] = color.color;
        }
    }
    
    /**
     * Draws a line between two points of the specified color using Brenshams algorithm
     *  @param {Object} p1 - Point2D for line starting point
     *  @param {Object} p2 - Point2D for line ending point
     *  @param color - Color object defining color of line
     */
    drawLine(p1, p2, color) {
        // Workout delta changes for each step
        let deltaX = Math.abs(p2.x - p1.x);
        let deltaY = Math.abs(p2.y - p1.y);
        // Step distance
        let stepX = Math.sign(x2 - x1);
        let stepY = Math.sign(y2 - y1);
        // Initialise step error to line slope
        let error = deltaX - deltaY;
        // Store current position
        let x = p1.x;
        let y = p1.y;
        const eX = p2.x;
        const eY = p2.y;
        
        while (true) {
            this.putPixel(x, y, color);
            // Reached end point?
            if ((x === eX) && (y === eY)) break;
            
            const err2 = error * 2;
            // Next step is closer to X
            if (err2 > -deltaY) {
                error -= deltaY;
                x += stepX;
            }
            // Next step is closer to Y
            if (err2 < deltaX) {
                error += deltaX;
                y += stepY;
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
