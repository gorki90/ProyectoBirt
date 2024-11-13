import {
  TileImage_default,
  appendParams
} from "./chunk-HC55QYIC.js";
import {
  fromResolutionLike
} from "./chunk-PZPTWPTE.js";
import {
  Source_default
} from "./chunk-W4SQ3WRQ.js";
import {
  ERROR_THRESHOLD,
  Triangulation_default,
  calculateSourceResolution,
  hash,
  render
} from "./chunk-AWOCSZPF.js";
import {
  ImageState_default,
  Image_default,
  decode
} from "./chunk-E55P2XYK.js";
import {
  buffer,
  compareVersions,
  containsExtent,
  createEmpty,
  equals,
  equivalent,
  get,
  getCenter,
  getForViewAndSize,
  getHeight,
  getIntersection,
  getWidth,
  isEmpty,
  transform
} from "./chunk-M6MJDGTG.js";
import {
  ceil,
  floor,
  modulo,
  round
} from "./chunk-EYQDZ7G2.js";
import {
  EventType_default,
  Event_default,
  linearFindNearest,
  listen,
  unlistenByKey
} from "./chunk-67OLVB4X.js";

// node_modules/ol/source/common.js
var DECIMALS = 4;

// node_modules/ol/reproj/Image.js
var ReprojImage = class extends Image_default {
  /**
   * @param {import("../proj/Projection.js").default} sourceProj Source projection (of the data).
   * @param {import("../proj/Projection.js").default} targetProj Target projection.
   * @param {import("../extent.js").Extent} targetExtent Target extent.
   * @param {number} targetResolution Target resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {FunctionType} getImageFunction
   *     Function returning source images (extent, resolution, pixelRatio).
   * @param {boolean} interpolate Use linear interpolation when resampling.
   */
  constructor(sourceProj, targetProj, targetExtent, targetResolution, pixelRatio, getImageFunction, interpolate) {
    let maxSourceExtent = sourceProj.getExtent();
    if (maxSourceExtent && sourceProj.canWrapX()) {
      maxSourceExtent = maxSourceExtent.slice();
      maxSourceExtent[0] = -Infinity;
      maxSourceExtent[2] = Infinity;
    }
    let maxTargetExtent = targetProj.getExtent();
    if (maxTargetExtent && targetProj.canWrapX()) {
      maxTargetExtent = maxTargetExtent.slice();
      maxTargetExtent[0] = -Infinity;
      maxTargetExtent[2] = Infinity;
    }
    const limitedTargetExtent = maxTargetExtent ? getIntersection(targetExtent, maxTargetExtent) : targetExtent;
    const targetCenter = getCenter(limitedTargetExtent);
    const sourceResolution = calculateSourceResolution(sourceProj, targetProj, targetCenter, targetResolution);
    const errorThresholdInPixels = ERROR_THRESHOLD;
    const triangulation = new Triangulation_default(sourceProj, targetProj, limitedTargetExtent, maxSourceExtent, sourceResolution * errorThresholdInPixels, targetResolution);
    const sourceExtent = triangulation.calculateSourceExtent();
    const sourceImage = isEmpty(sourceExtent) ? null : getImageFunction(sourceExtent, sourceResolution, pixelRatio);
    const state = sourceImage ? ImageState_default.IDLE : ImageState_default.EMPTY;
    const sourcePixelRatio = sourceImage ? sourceImage.getPixelRatio() : 1;
    super(targetExtent, targetResolution, sourcePixelRatio, state);
    this.targetProj_ = targetProj;
    this.maxSourceExtent_ = maxSourceExtent;
    this.triangulation_ = triangulation;
    this.targetResolution_ = targetResolution;
    this.targetExtent_ = targetExtent;
    this.sourceImage_ = sourceImage;
    this.sourcePixelRatio_ = sourcePixelRatio;
    this.interpolate_ = interpolate;
    this.canvas_ = null;
    this.sourceListenerKey_ = null;
  }
  /**
   * Clean up.
   * @override
   */
  disposeInternal() {
    if (this.state == ImageState_default.LOADING) {
      this.unlistenSource_();
    }
    super.disposeInternal();
  }
  /**
   * @return {HTMLCanvasElement} Image.
   * @override
   */
  getImage() {
    return this.canvas_;
  }
  /**
   * @return {import("../proj/Projection.js").default} Projection.
   */
  getProjection() {
    return this.targetProj_;
  }
  /**
   * @private
   */
  reproject_() {
    const sourceState = this.sourceImage_.getState();
    if (sourceState == ImageState_default.LOADED) {
      const width = getWidth(this.targetExtent_) / this.targetResolution_;
      const height = getHeight(this.targetExtent_) / this.targetResolution_;
      this.canvas_ = render(width, height, this.sourcePixelRatio_, fromResolutionLike(this.sourceImage_.getResolution()), this.maxSourceExtent_, this.targetResolution_, this.targetExtent_, this.triangulation_, [{
        extent: this.sourceImage_.getExtent(),
        image: this.sourceImage_.getImage()
      }], 0, void 0, this.interpolate_, true);
    }
    this.state = sourceState;
    this.changed();
  }
  /**
   * Load not yet loaded URI.
   * @override
   */
  load() {
    if (this.state == ImageState_default.IDLE) {
      this.state = ImageState_default.LOADING;
      this.changed();
      const sourceState = this.sourceImage_.getState();
      if (sourceState == ImageState_default.LOADED || sourceState == ImageState_default.ERROR) {
        this.reproject_();
      } else {
        this.sourceListenerKey_ = listen(this.sourceImage_, EventType_default.CHANGE, (e) => {
          const sourceState2 = this.sourceImage_.getState();
          if (sourceState2 == ImageState_default.LOADED || sourceState2 == ImageState_default.ERROR) {
            this.unlistenSource_();
            this.reproject_();
          }
        });
        this.sourceImage_.load();
      }
    }
  }
  /**
   * @private
   */
  unlistenSource_() {
    unlistenByKey(
      /** @type {!import("../events.js").EventsKey} */
      this.sourceListenerKey_
    );
    this.sourceListenerKey_ = null;
  }
};
var Image_default2 = ReprojImage;

// node_modules/ol/source/Image.js
var ImageSourceEventType = {
  /**
   * Triggered when an image starts loading.
   * @event module:ol/source/Image.ImageSourceEvent#imageloadstart
   * @api
   */
  IMAGELOADSTART: "imageloadstart",
  /**
   * Triggered when an image finishes loading.
   * @event module:ol/source/Image.ImageSourceEvent#imageloadend
   * @api
   */
  IMAGELOADEND: "imageloadend",
  /**
   * Triggered if image loading results in an error.
   * @event module:ol/source/Image.ImageSourceEvent#imageloaderror
   * @api
   */
  IMAGELOADERROR: "imageloaderror"
};
var ImageSourceEvent = class extends Event_default {
  /**
   * @param {string} type Type.
   * @param {import("../Image.js").default} image The image.
   */
  constructor(type, image) {
    super(type);
    this.image = image;
  }
};
var ImageSource = class extends Source_default {
  /**
   * @param {Options} options Single image source options.
   */
  constructor(options) {
    super({
      attributions: options.attributions,
      projection: options.projection,
      state: options.state,
      interpolate: options.interpolate !== void 0 ? options.interpolate : true
    });
    this.on;
    this.once;
    this.un;
    this.loader = options.loader || null;
    this.resolutions_ = options.resolutions !== void 0 ? options.resolutions : null;
    this.reprojectedImage_ = null;
    this.reprojectedRevision_ = 0;
    this.image = null;
    this.wantedExtent_;
    this.wantedResolution_;
    this.static_ = options.loader ? options.loader.length === 0 : false;
    this.wantedProjection_ = null;
  }
  /**
   * @return {Array<number>|null} Resolutions.
   * @override
   */
  getResolutions() {
    return this.resolutions_;
  }
  /**
   * @param {Array<number>|null} resolutions Resolutions.
   */
  setResolutions(resolutions) {
    this.resolutions_ = resolutions;
  }
  /**
   * @protected
   * @param {number} resolution Resolution.
   * @return {number} Resolution.
   */
  findNearestResolution(resolution) {
    const resolutions = this.getResolutions();
    if (resolutions) {
      const idx = linearFindNearest(resolutions, resolution, 0);
      resolution = resolutions[idx];
    }
    return resolution;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../Image.js").default} Single image.
   */
  getImage(extent, resolution, pixelRatio, projection) {
    const sourceProjection = this.getProjection();
    if (!sourceProjection || !projection || equivalent(sourceProjection, projection)) {
      if (sourceProjection) {
        projection = sourceProjection;
      }
      return this.getImageInternal(extent, resolution, pixelRatio, projection);
    }
    if (this.reprojectedImage_) {
      if (this.reprojectedRevision_ == this.getRevision() && equivalent(this.reprojectedImage_.getProjection(), projection) && this.reprojectedImage_.getResolution() == resolution && equals(this.reprojectedImage_.getExtent(), extent)) {
        return this.reprojectedImage_;
      }
      this.reprojectedImage_.dispose();
      this.reprojectedImage_ = null;
    }
    this.reprojectedImage_ = new Image_default2(sourceProjection, projection, extent, resolution, pixelRatio, (extent2, resolution2, pixelRatio2) => this.getImageInternal(extent2, resolution2, pixelRatio2, sourceProjection), this.getInterpolate());
    this.reprojectedRevision_ = this.getRevision();
    return this.reprojectedImage_;
  }
  /**
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../Image.js").default} Single image.
   * @protected
   */
  getImageInternal(extent, resolution, pixelRatio, projection) {
    if (this.loader) {
      const requestExtent = getRequestExtent(extent, resolution, pixelRatio, 1);
      const requestResolution = this.findNearestResolution(resolution);
      if (this.image && (this.static_ || this.wantedProjection_ === projection && (this.wantedExtent_ && containsExtent(this.wantedExtent_, requestExtent) || containsExtent(this.image.getExtent(), requestExtent)) && (this.wantedResolution_ && fromResolutionLike(this.wantedResolution_) === requestResolution || fromResolutionLike(this.image.getResolution()) === requestResolution))) {
        return this.image;
      }
      this.wantedProjection_ = projection;
      this.wantedExtent_ = requestExtent;
      this.wantedResolution_ = requestResolution;
      this.image = new Image_default(requestExtent, requestResolution, pixelRatio, this.loader);
      this.image.addEventListener(EventType_default.CHANGE, this.handleImageChange.bind(this));
    }
    return this.image;
  }
  /**
   * Handle image change events.
   * @param {import("../events/Event.js").default} event Event.
   * @protected
   */
  handleImageChange(event) {
    const image = (
      /** @type {import("../Image.js").default} */
      event.target
    );
    let type;
    switch (image.getState()) {
      case ImageState_default.LOADING:
        this.loading = true;
        type = ImageSourceEventType.IMAGELOADSTART;
        break;
      case ImageState_default.LOADED:
        this.loading = false;
        type = ImageSourceEventType.IMAGELOADEND;
        break;
      case ImageState_default.ERROR:
        this.loading = false;
        type = ImageSourceEventType.IMAGELOADERROR;
        break;
      default:
        return;
    }
    if (this.hasListener(type)) {
      this.dispatchEvent(new ImageSourceEvent(type, image));
    }
  }
};
function defaultImageLoadFunction(image, src) {
  image.getImage().src = src;
}
function getRequestExtent(extent, resolution, pixelRatio, ratio) {
  const imageResolution = resolution / pixelRatio;
  const center = getCenter(extent);
  const viewWidth = ceil(getWidth(extent) / imageResolution, DECIMALS);
  const viewHeight = ceil(getHeight(extent) / imageResolution, DECIMALS);
  const marginWidth = ceil((ratio - 1) * viewWidth / 2, DECIMALS);
  const requestWidth = viewWidth + 2 * marginWidth;
  const marginHeight = ceil((ratio - 1) * viewHeight / 2, DECIMALS);
  const requestHeight = viewHeight + 2 * marginHeight;
  return getForViewAndSize(center, imageResolution, 0, [requestWidth, requestHeight]);
}
var Image_default3 = ImageSource;

// node_modules/ol/source/wms.js
var DEFAULT_VERSION = "1.3.0";
var GETFEATUREINFO_IMAGE_SIZE = [101, 101];
function getRequestUrl(baseUrl, extent, size, projection, params) {
  params["WIDTH"] = size[0];
  params["HEIGHT"] = size[1];
  const axisOrientation = projection.getAxisOrientation();
  const v13 = compareVersions(params["VERSION"], "1.3") >= 0;
  params[v13 ? "CRS" : "SRS"] = projection.getCode();
  const bbox = v13 && axisOrientation.startsWith("ne") ? [extent[1], extent[0], extent[3], extent[2]] : extent;
  params["BBOX"] = bbox.join(",");
  return appendParams(baseUrl, params);
}
function getImageSrc(extent, resolution, pixelRatio, projection, url, params, serverType) {
  params = Object.assign({
    REQUEST: "GetMap"
  }, params);
  const imageResolution = resolution / pixelRatio;
  const imageSize = [round(getWidth(extent) / imageResolution, DECIMALS), round(getHeight(extent) / imageResolution, DECIMALS)];
  if (pixelRatio != 1) {
    switch (serverType) {
      case "geoserver":
        const dpi = 90 * pixelRatio + 0.5 | 0;
        if ("FORMAT_OPTIONS" in params) {
          params["FORMAT_OPTIONS"] += ";dpi:" + dpi;
        } else {
          params["FORMAT_OPTIONS"] = "dpi:" + dpi;
        }
        break;
      case "mapserver":
        params["MAP_RESOLUTION"] = 90 * pixelRatio;
        break;
      case "carmentaserver":
      case "qgis":
        params["DPI"] = 90 * pixelRatio;
        break;
      default:
        throw new Error("Unknown `serverType` configured");
    }
  }
  const src = getRequestUrl(url, extent, imageSize, projection, params);
  return src;
}
function getRequestParams(params, request) {
  return Object.assign({
    "REQUEST": request,
    "SERVICE": "WMS",
    "VERSION": DEFAULT_VERSION,
    "FORMAT": "image/png",
    "STYLES": "",
    "TRANSPARENT": true
  }, params);
}
function createLoader(options) {
  const hidpi = options.hidpi === void 0 ? true : options.hidpi;
  const projection = get(options.projection || "EPSG:3857");
  const ratio = options.ratio || 1.5;
  const load = options.load || decode;
  const crossOrigin = options.crossOrigin ?? null;
  return (extent, resolution, pixelRatio) => {
    extent = getRequestExtent(extent, resolution, pixelRatio, ratio);
    if (pixelRatio != 1 && (!hidpi || options.serverType === void 0)) {
      pixelRatio = 1;
    }
    const src = getImageSrc(extent, resolution, pixelRatio, projection, options.url, getRequestParams(options.params, "GetMap"), options.serverType);
    const image = new Image();
    image.crossOrigin = crossOrigin;
    return load(image, src).then((image2) => ({
      image: image2,
      extent,
      pixelRatio
    }));
  };
}
function getFeatureInfoUrl(options, coordinate, resolution) {
  if (options.url === void 0) {
    return void 0;
  }
  const projectionObj = get(options.projection || "EPSG:3857");
  const extent = getForViewAndSize(coordinate, resolution, 0, GETFEATUREINFO_IMAGE_SIZE);
  const baseParams = {
    "QUERY_LAYERS": options.params["LAYERS"],
    "INFO_FORMAT": "application/json"
  };
  Object.assign(baseParams, getRequestParams(options.params, "GetFeatureInfo"), options.params);
  const x = floor((coordinate[0] - extent[0]) / resolution, DECIMALS);
  const y = floor((extent[3] - coordinate[1]) / resolution, DECIMALS);
  const v13 = compareVersions(baseParams["VERSION"], "1.3") >= 0;
  baseParams[v13 ? "I" : "X"] = x;
  baseParams[v13 ? "J" : "Y"] = y;
  return getRequestUrl(options.url, extent, GETFEATUREINFO_IMAGE_SIZE, projectionObj, baseParams);
}
function getLegendUrl(options, resolution) {
  if (options.url === void 0) {
    return void 0;
  }
  const baseParams = {
    "SERVICE": "WMS",
    "VERSION": DEFAULT_VERSION,
    "REQUEST": "GetLegendGraphic",
    "FORMAT": "image/png"
  };
  if (resolution !== void 0) {
    const mpu = get(options.projection || "EPSG:3857").getMetersPerUnit() || 1;
    const pixelSize = 28e-5;
    baseParams["SCALE"] = resolution * mpu / pixelSize;
  }
  Object.assign(baseParams, options.params);
  if (options.params !== void 0 && baseParams["LAYER"] === void 0) {
    const layers = baseParams["LAYERS"];
    const isSingleLayer = !Array.isArray(layers) || layers.length !== 1;
    if (!isSingleLayer) {
      return void 0;
    }
    baseParams["LAYER"] = layers;
  }
  return appendParams(options.url, baseParams);
}

// node_modules/ol/source/TileWMS.js
var TileWMS = class extends TileImage_default {
  /**
   * @param {Options} [options] Tile WMS options.
   */
  constructor(options) {
    options = options ? options : (
      /** @type {Options} */
      {}
    );
    const params = Object.assign({}, options.params);
    super({
      attributions: options.attributions,
      attributionsCollapsible: options.attributionsCollapsible,
      cacheSize: options.cacheSize,
      crossOrigin: options.crossOrigin,
      interpolate: options.interpolate,
      projection: options.projection,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      tileClass: options.tileClass,
      tileGrid: options.tileGrid,
      tileLoadFunction: options.tileLoadFunction,
      url: options.url,
      urls: options.urls,
      wrapX: options.wrapX !== void 0 ? options.wrapX : true,
      transition: options.transition,
      zDirection: options.zDirection
    });
    this.gutter_ = options.gutter !== void 0 ? options.gutter : 0;
    this.params_ = params;
    this.v13_ = true;
    this.serverType_ = options.serverType;
    this.hidpi_ = options.hidpi !== void 0 ? options.hidpi : true;
    this.tmpExtent_ = createEmpty();
    this.updateV13_();
    this.setKey(this.getKeyForParams_());
  }
  /**
   * Return the GetFeatureInfo URL for the passed coordinate, resolution, and
   * projection. Return `undefined` if the GetFeatureInfo URL cannot be
   * constructed.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} resolution Resolution.
   * @param {import("../proj.js").ProjectionLike} projection Projection.
   * @param {!Object} params GetFeatureInfo params. `INFO_FORMAT` at least should
   *     be provided. If `QUERY_LAYERS` is not provided then the layers specified
   *     in the `LAYERS` parameter will be used. `VERSION` should not be
   *     specified here.
   * @return {string|undefined} GetFeatureInfo URL.
   * @api
   */
  getFeatureInfoUrl(coordinate, resolution, projection, params) {
    const projectionObj = get(projection);
    const sourceProjectionObj = this.getProjection() || projectionObj;
    let tileGrid = this.getTileGrid();
    if (!tileGrid) {
      tileGrid = this.getTileGridForProjection(sourceProjectionObj);
    }
    const sourceProjCoord = transform(coordinate, projectionObj, sourceProjectionObj);
    const sourceResolution = calculateSourceResolution(sourceProjectionObj, projectionObj, coordinate, resolution);
    const z = tileGrid.getZForResolution(sourceResolution, this.zDirection);
    const tileResolution = tileGrid.getResolution(z);
    const tileCoord = tileGrid.getTileCoordForCoordAndZ(sourceProjCoord, z);
    if (tileGrid.getResolutions().length <= tileCoord[0]) {
      return void 0;
    }
    let tileExtent = tileGrid.getTileCoordExtent(tileCoord, this.tmpExtent_);
    const gutter = this.gutter_;
    if (gutter !== 0) {
      tileExtent = buffer(tileExtent, tileResolution * gutter, tileExtent);
    }
    const baseParams = {
      "QUERY_LAYERS": this.params_["LAYERS"]
    };
    Object.assign(baseParams, getRequestParams(this.params_, "GetFeatureInfo"), params);
    const x = Math.floor((sourceProjCoord[0] - tileExtent[0]) / tileResolution);
    const y = Math.floor((tileExtent[3] - sourceProjCoord[1]) / tileResolution);
    baseParams[this.v13_ ? "I" : "X"] = x;
    baseParams[this.v13_ ? "J" : "Y"] = y;
    return this.getRequestUrl_(tileCoord, tileExtent, 1, sourceProjectionObj || projectionObj, baseParams);
  }
  /**
   * Return the GetLegendGraphic URL, optionally optimized for the passed
   * resolution and possibly including any passed specific parameters. Returns
   * `undefined` if the GetLegendGraphic URL cannot be constructed.
   *
   * @param {number} [resolution] Resolution. If set to undefined, `SCALE`
   *     will not be calculated and included in URL.
   * @param {Object} [params] GetLegendGraphic params. If `LAYER` is set, the
   *     request is generated for this wms layer, else it will try to use the
   *     configured wms layer. Default `FORMAT` is `image/png`.
   *     `VERSION` should not be specified here.
   * @return {string|undefined} GetLegendGraphic URL.
   * @api
   */
  getLegendUrl(resolution, params) {
    if (this.urls[0] === void 0) {
      return void 0;
    }
    const baseParams = {
      "SERVICE": "WMS",
      "VERSION": DEFAULT_VERSION,
      "REQUEST": "GetLegendGraphic",
      "FORMAT": "image/png"
    };
    if (params === void 0 || params["LAYER"] === void 0) {
      const layers = this.params_.LAYERS;
      const isSingleLayer = !Array.isArray(layers) || layers.length === 1;
      if (!isSingleLayer) {
        return void 0;
      }
      baseParams["LAYER"] = layers;
    }
    if (resolution !== void 0) {
      const mpu = this.getProjection() ? this.getProjection().getMetersPerUnit() : 1;
      const pixelSize = 28e-5;
      baseParams["SCALE"] = resolution * mpu / pixelSize;
    }
    Object.assign(baseParams, params);
    return appendParams(
      /** @type {string} */
      this.urls[0],
      baseParams
    );
  }
  /**
   * @return {number} Gutter.
   * @override
   */
  getGutter() {
    return this.gutter_;
  }
  /**
   * Get the user-provided params, i.e. those passed to the constructor through
   * the "params" option, and possibly updated using the updateParams method.
   * @return {Object} Params.
   * @api
   */
  getParams() {
    return this.params_;
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../extent.js").Extent} tileExtent Tile extent.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {Object} params Params.
   * @return {string|undefined} Request URL.
   * @private
   */
  getRequestUrl_(tileCoord, tileExtent, pixelRatio, projection, params) {
    const urls = this.urls;
    if (!urls) {
      return void 0;
    }
    let url;
    if (urls.length == 1) {
      url = urls[0];
    } else {
      const index = modulo(hash(tileCoord), urls.length);
      url = urls[index];
    }
    return getImageSrc(tileExtent, (this.tileGrid || this.getTileGridForProjection(projection)).getResolution(tileCoord[0]), pixelRatio, projection, url, params, this.serverType_);
  }
  /**
   * Get the tile pixel ratio for this source.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Tile pixel ratio.
   * @override
   */
  getTilePixelRatio(pixelRatio) {
    return !this.hidpi_ || this.serverType_ === void 0 ? 1 : pixelRatio;
  }
  /**
   * @private
   * @return {string} The key for the current params.
   */
  getKeyForParams_() {
    let i = 0;
    const res = [];
    for (const key in this.params_) {
      res[i++] = key + "-" + this.params_[key];
    }
    return res.join("/");
  }
  /**
   * Update the user-provided params.
   * @param {Object} params Params.
   * @api
   */
  updateParams(params) {
    Object.assign(this.params_, params);
    this.updateV13_();
    this.setKey(this.getKeyForParams_());
  }
  /**
   * @private
   */
  updateV13_() {
    const version = this.params_["VERSION"] || DEFAULT_VERSION;
    this.v13_ = compareVersions(version, "1.3") >= 0;
  }
  /**
   * @param {import("../tilecoord.js").TileCoord} tileCoord The tile coordinate
   * @param {number} pixelRatio The pixel ratio
   * @param {import("../proj/Projection.js").default} projection The projection
   * @return {string|undefined} The tile URL
   * @override
   */
  tileUrlFunction(tileCoord, pixelRatio, projection) {
    let tileGrid = this.getTileGrid();
    if (!tileGrid) {
      tileGrid = this.getTileGridForProjection(projection);
    }
    if (tileGrid.getResolutions().length <= tileCoord[0]) {
      return void 0;
    }
    if (pixelRatio != 1 && (!this.hidpi_ || this.serverType_ === void 0)) {
      pixelRatio = 1;
    }
    const tileResolution = tileGrid.getResolution(tileCoord[0]);
    let tileExtent = tileGrid.getTileCoordExtent(tileCoord, this.tmpExtent_);
    const gutter = this.gutter_;
    if (gutter !== 0) {
      tileExtent = buffer(tileExtent, tileResolution * gutter, tileExtent);
    }
    const baseParams = Object.assign({}, getRequestParams(this.params_, "GetMap"));
    return this.getRequestUrl_(tileCoord, tileExtent, pixelRatio, projection, baseParams);
  }
};
var TileWMS_default = TileWMS;

export {
  DECIMALS,
  defaultImageLoadFunction,
  getRequestExtent,
  Image_default3 as Image_default,
  createLoader,
  getFeatureInfoUrl,
  getLegendUrl,
  TileWMS_default
};
//# sourceMappingURL=chunk-KHPA4KHP.js.map
