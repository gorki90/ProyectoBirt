import {
  EventType_default,
  Target_default,
  listenOnce,
  toPromise,
  unlistenByKey
} from "./chunk-67OLVB4X.js";

// node_modules/ol/ImageState.js
var ImageState_default = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,
  ERROR: 3,
  EMPTY: 4
};

// node_modules/ol/has.js
var ua = typeof navigator !== "undefined" && typeof navigator.userAgent !== "undefined" ? navigator.userAgent.toLowerCase() : "";
var FIREFOX = ua.includes("firefox");
var SAFARI = ua.includes("safari") && !ua.includes("chrom");
var SAFARI_BUG_237906 = SAFARI && (ua.includes("version/15.4") || /cpu (os|iphone os) 15_4 like mac os x/.test(ua));
var WEBKIT = ua.includes("webkit") && !ua.includes("edge");
var MAC = ua.includes("macintosh");
var DEVICE_PIXEL_RATIO = typeof devicePixelRatio !== "undefined" ? devicePixelRatio : 1;
var WORKER_OFFSCREEN_CANVAS = typeof WorkerGlobalScope !== "undefined" && typeof OffscreenCanvas !== "undefined" && self instanceof WorkerGlobalScope;
var IMAGE_DECODE = typeof Image !== "undefined" && Image.prototype.decode;
var CREATE_IMAGE_BITMAP = typeof createImageBitmap === "function";
var PASSIVE_EVENT_LISTENERS = function() {
  let passive = false;
  try {
    const options = Object.defineProperty({}, "passive", {
      get: function() {
        passive = true;
      }
    });
    window.addEventListener("_", null, options);
    window.removeEventListener("_", null, options);
  } catch (error) {
  }
  return passive;
}();

// node_modules/ol/dom.js
function createCanvasContext2D(width, height, canvasPool, settings) {
  let canvas;
  if (canvasPool && canvasPool.length) {
    canvas = /** @type {HTMLCanvasElement} */
    canvasPool.shift();
  } else if (WORKER_OFFSCREEN_CANVAS) {
    canvas = new OffscreenCanvas(width || 300, height || 300);
  } else {
    canvas = document.createElement("canvas");
  }
  if (width) {
    canvas.width = width;
  }
  if (height) {
    canvas.height = height;
  }
  return (
    /** @type {CanvasRenderingContext2D} */
    canvas.getContext("2d", settings)
  );
}
var sharedCanvasContext;
function getSharedCanvasContext2D() {
  if (!sharedCanvasContext) {
    sharedCanvasContext = createCanvasContext2D(1, 1);
  }
  return sharedCanvasContext;
}
function releaseCanvas(context) {
  const canvas = context.canvas;
  canvas.width = 1;
  canvas.height = 1;
  context.clearRect(0, 0, 1, 1);
}
function replaceNode(newNode, oldNode) {
  const parent = oldNode.parentNode;
  if (parent) {
    parent.replaceChild(newNode, oldNode);
  }
}
function removeChildren(node) {
  while (node.lastChild) {
    node.lastChild.remove();
  }
}
function replaceChildren(node, children) {
  const oldChildren = node.childNodes;
  for (let i = 0; true; ++i) {
    const oldChild = oldChildren[i];
    const newChild = children[i];
    if (!oldChild && !newChild) {
      break;
    }
    if (oldChild === newChild) {
      continue;
    }
    if (!oldChild) {
      node.appendChild(newChild);
      continue;
    }
    if (!newChild) {
      node.removeChild(oldChild);
      --i;
      continue;
    }
    node.insertBefore(newChild, oldChild);
  }
}

// node_modules/ol/Image.js
var ImageWrapper = class extends Target_default {
  /**
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {number|Array<number>|undefined} resolution Resolution. If provided as array, x and y
   * resolution will be assumed.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("./ImageState.js").default|import("./Image.js").Loader} stateOrLoader State.
   */
  constructor(extent, resolution, pixelRatio, stateOrLoader) {
    super();
    this.extent = extent;
    this.pixelRatio_ = pixelRatio;
    this.resolution = resolution;
    this.state = typeof stateOrLoader === "function" ? ImageState_default.IDLE : stateOrLoader;
    this.image_ = null;
    this.loader = typeof stateOrLoader === "function" ? stateOrLoader : null;
  }
  /**
   * @protected
   */
  changed() {
    this.dispatchEvent(EventType_default.CHANGE);
  }
  /**
   * @return {import("./extent.js").Extent} Extent.
   */
  getExtent() {
    return this.extent;
  }
  /**
   * @return {import('./DataTile.js').ImageLike} Image.
   */
  getImage() {
    return this.image_;
  }
  /**
   * @return {number} PixelRatio.
   */
  getPixelRatio() {
    return this.pixelRatio_;
  }
  /**
   * @return {number|Array<number>} Resolution.
   */
  getResolution() {
    return (
      /** @type {number} */
      this.resolution
    );
  }
  /**
   * @return {import("./ImageState.js").default} State.
   */
  getState() {
    return this.state;
  }
  /**
   * Load not yet loaded URI.
   */
  load() {
    if (this.state == ImageState_default.IDLE) {
      if (this.loader) {
        this.state = ImageState_default.LOADING;
        this.changed();
        const resolution = this.getResolution();
        const requestResolution = Array.isArray(resolution) ? resolution[0] : resolution;
        toPromise(() => this.loader(this.getExtent(), requestResolution, this.getPixelRatio())).then((image) => {
          if ("image" in image) {
            this.image_ = image.image;
          }
          if ("extent" in image) {
            this.extent = image.extent;
          }
          if ("resolution" in image) {
            this.resolution = image.resolution;
          }
          if ("pixelRatio" in image) {
            this.pixelRatio_ = image.pixelRatio;
          }
          if (image instanceof HTMLImageElement || image instanceof ImageBitmap || image instanceof HTMLCanvasElement || image instanceof HTMLVideoElement) {
            this.image_ = image;
          }
          this.state = ImageState_default.LOADED;
        }).catch((error) => {
          this.state = ImageState_default.ERROR;
          console.error(error);
        }).finally(() => this.changed());
      }
    }
  }
  /**
   * @param {import('./DataTile.js').ImageLike} image The image.
   */
  setImage(image) {
    this.image_ = image;
  }
  /**
   * @param {number|Array<number>} resolution Resolution.
   */
  setResolution(resolution) {
    this.resolution = resolution;
  }
};
function listenImage(image, loadHandler, errorHandler) {
  const img = (
    /** @type {HTMLImageElement} */
    image
  );
  let listening = true;
  let decoding = false;
  let loaded = false;
  const listenerKeys = [listenOnce(img, EventType_default.LOAD, function() {
    loaded = true;
    if (!decoding) {
      loadHandler();
    }
  })];
  if (img.src && IMAGE_DECODE) {
    decoding = true;
    img.decode().then(function() {
      if (listening) {
        loadHandler();
      }
    }).catch(function(error) {
      if (listening) {
        if (loaded) {
          loadHandler();
        } else {
          errorHandler();
        }
      }
    });
  } else {
    listenerKeys.push(listenOnce(img, EventType_default.ERROR, errorHandler));
  }
  return function unlisten() {
    listening = false;
    listenerKeys.forEach(unlistenByKey);
  };
}
function load(image, src) {
  return new Promise((resolve, reject) => {
    function handleLoad() {
      unlisten();
      resolve(image);
    }
    function handleError() {
      unlisten();
      reject(new Error("Image load error"));
    }
    function unlisten() {
      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);
    }
    image.addEventListener("load", handleLoad);
    image.addEventListener("error", handleError);
    if (src) {
      image.src = src;
    }
  });
}
function decodeFallback(image, src) {
  if (src) {
    image.src = src;
  }
  return image.src && IMAGE_DECODE ? new Promise((resolve, reject) => image.decode().then(() => resolve(image)).catch((e) => image.complete && image.width ? resolve(image) : reject(e))) : load(image);
}
function decode(image, src) {
  if (src) {
    image.src = src;
  }
  return image.src && IMAGE_DECODE && CREATE_IMAGE_BITMAP ? image.decode().then(() => createImageBitmap(image)).catch((e) => {
    if (image.complete && image.width) {
      return image;
    }
    throw e;
  }) : decodeFallback(image);
}
var Image_default = ImageWrapper;

export {
  ImageState_default,
  FIREFOX,
  SAFARI_BUG_237906,
  WEBKIT,
  MAC,
  DEVICE_PIXEL_RATIO,
  WORKER_OFFSCREEN_CANVAS,
  PASSIVE_EVENT_LISTENERS,
  createCanvasContext2D,
  getSharedCanvasContext2D,
  releaseCanvas,
  replaceNode,
  removeChildren,
  replaceChildren,
  listenImage,
  decodeFallback,
  decode,
  Image_default
};
//# sourceMappingURL=chunk-E55P2XYK.js.map
