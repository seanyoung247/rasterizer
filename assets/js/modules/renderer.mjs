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
     * @param {Object} x - x coordinate of pixel
     * @param {Object} y - y coordinate of pixel
     * @param {Object} color - Color object defining color of pixel
     */
    putPixel(x, y, color) {
        const width = this._canvas.clientWidth;
        const height = this._canvas.clientHeight;
        if (this._inBounds(x, y, width, height)) {
            const index = x + (y * width);
            this._buffer.pixels[index] = color.color;
        }
    }
    
    /**
     * Draws a line between two points of the specified color using Brenshams algorithm
     *  @param {Object} p0 - Point2D for line starting point
     *  @param {Object} p1 - Point2D for line ending point
     *  @param color - Color object defining color of line
     */
    drawLine(p0, p1, color) {
        // Workout delta changes for each step
        let deltaX = Math.abs(p1.x - p0.x);
        let deltaY = Math.abs(p1.y - p0.y);
        // Step distance
        let stepX = Math.sign(p1.x - p0.x);
        let stepY = Math.sign(p1.y - p0.y);
        // Initialise step error to line slope
        let error = deltaX - deltaY;
        // Store current position
        let x = p0.x;
        let y = p0.y;
        const eX = p1.x;
        const eY = p1.y;

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

    /**
     * 
     * @param {Object} p0 Point2D of first corner
     * @param {Object} p1 Point2D of second corner
     * @param {Object} p2 Point2D of third corner
     * @param {Object} color Color object to draw
     * @param {Boolean} filled Should triangle be drawn as an outline or filled?
     */
    drawTriangle(p0, p1, p2, color, filled) {
        //if (!filled) {
            this.drawLine(p0, p1, color);
            this.drawLine(p1, p2, color);
            this.drawLine(p2, p0, color);
        //}
    }

    /**
     * Completes a frame and shows it on-screen
     */
    endFrame() {
        // Copy screen buffer back to screen
        this._context.putImageData(this._buffer.image,0,0);
    }
}
