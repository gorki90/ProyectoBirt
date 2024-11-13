import {
  inflate_1
} from "./chunk-MA62K4MY.js";
import {
  BaseDecoder
} from "./chunk-ARDIML6Z.js";
import "./chunk-KTESVR3Q.js";

// node_modules/geotiff/dist-module/compression/deflate.js
var DeflateDecoder = class extends BaseDecoder {
  decodeBlock(buffer) {
    return inflate_1(new Uint8Array(buffer)).buffer;
  }
};
export {
  DeflateDecoder as default
};
//# sourceMappingURL=deflate-XBAUJNDT.js.map
