
import { Renderer } from "./modules/renderer.mjs"
let renderer = null;

(function () {
    renderer = new rasterizer(document.getElementById("screen-view"));
    window.requestAnimationFrame(frame);
})();

function frame() {

    renderer.startFrame();

    for (let x = 10; x < 100; x++) {
        for (let y = 10; y < 100; y++) {
            renderer.putPixel(x,y,0xFFFF0000);
        }
    }
        
    renderer.endFrame();

    //window.requestAnimationFrame(frame);
}
