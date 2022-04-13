
/**
 * Helper function to convert an RGB(A) color into a 32bit one
 * @param {Number} red Red color channel
 * @param {Number} green Green color channel
 * @param {Number} blue Blue color channel
 * @param {Number} alpha (optional) Alpha channel
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
     * @param {Number} color 32bit color code in RGBA format (Optional)
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
     * @param {String} str Hex string
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
