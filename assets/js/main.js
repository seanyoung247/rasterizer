
import { rasterizer } from "./modules/rasterizer.mjs"
let renderer = null;

(function () {
    renderer = new rasterizer(document.getElementById("screen-view"));
    window.requestAnimationFrame(frame);
})();

function frame() {

    renderer.startFrame();
        
    renderer.endFrame();
    
    window.requestAnimationFrame(this);
}
