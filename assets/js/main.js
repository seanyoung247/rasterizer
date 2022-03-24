
import rasterizer from "modules/rasterizer.mjs"
let renderer = null;

(function init() {
    renderer = new rasterizer(document.getElementById("screen-view"));
})();

