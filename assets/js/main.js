
import { Color, RGBA } from "./modules/types/color.mjs";
import { Renderer } from "./modules/renderer.mjs";

let renderer = null;
let mX = 0;
let mY = 0;

(function () {
    renderer = new Renderer(document.getElementById("screen-view"));
    window.requestAnimationFrame(frame);
})();

// window.addEventListener('mousemove', e => {
//     mX = e.offsetX;
//     mY = e.offsetY;
// });

function frame() {

    renderer.startFrame(true);

    for (let x = 10; x < 100; x++) {
        for (let y = 10; y < 100; y++) {
            renderer.putPixel(x,y,new Color(RGBA(255,0,0)));
        }
    }
    
    //renderer.drawLine(100,100,mX,mY,new Color(RGBA(0,0,0,200)));
    
    renderer.drawTriangle({x:100,y:100}, {x:150,y:150}, {x:10,y:100}, new Color(RGBA(0,0,0,200)), false);
        
    renderer.endFrame();

    //window.requestAnimationFrame(frame);
}
