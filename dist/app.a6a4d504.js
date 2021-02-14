// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/simple-color-picker/dist/simple-color-picker.module.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function t(t, e) {
  for (var i = 0; i < e.length; i++) {
    var o = e[i];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o);
  }
}

function e(e, i, o) {
  return i && t(e.prototype, i), o && t(e, o), e;
}

function i(t) {
  return "number" == typeof t && !isNaN(t);
}

function o(t, e, i) {
  return Math.min(Math.max(t, e), i);
}

function n(t) {
  if (0 === t.type.indexOf("touch")) {
    var e = t.touches[0];
    return {
      x: e.clientX,
      y: e.clientY
    };
  }

  return {
    x: t.clientX,
    y: t.clientY
  };
}

function s(t) {
  return 1 == t.length ? "0" + t : "" + t;
}

var r = function () {
  function t(t) {
    this._rgba = {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    }, this._hsva = {
      h: 0,
      s: 0,
      v: 0,
      a: 1
    }, this.fromHex(t);
  }

  var o = t.prototype;
  return o.fromHex = function (t) {
    t || (t = 0), i(t) ? (this._hexNumber = t, this._hexString = function (t) {
      return "#" + ("00000" + (0 | t).toString(16)).substr(-6).toUpperCase();
    }(this._hexNumber)) : (this._hexString = t.toUpperCase(), this._hexNumber = h(this._hexString));

    var e = function (t) {
      return {
        r: (t >> 16 & 255) / 255,
        g: (t >> 8 & 255) / 255,
        b: (255 & t) / 255
      };
    }(this._hexNumber),
        o = e.g,
        n = e.b;

    this._rgba.r = e.r, this._rgba.g = o, this._rgba.b = n;

    var s = function (t) {
      var e,
          i = t.r,
          o = t.g,
          n = t.b,
          s = Math.max(i, o, n),
          r = Math.min(i, o, n),
          h = s - r,
          u = 0 === s ? 0 : h / s,
          a = s;
      if (s == r) e = 0;else {
        switch (s) {
          case i:
            e = (o - n) / h + (o < n ? 6 : 0);
            break;

          case o:
            e = (n - i) / h + 2;
            break;

          case n:
            e = (i - o) / h + 4;
        }

        e /= 6;
      }
      return {
        h: e,
        s: u,
        v: a
      };
    }(this._rgba),
        r = s.s,
        u = s.v;

    this._hsva.h = s.h, this._hsva.s = r, this._hsva.v = u, this._updateBrightness();
  }, o.fromHsv = function (t) {
    var e = t.s,
        i = t.v;
    this._hsva.h = t.h, this._hsva.s = e, this._hsva.v = i;

    var o = function (t) {
      var e = t.h,
          i = t.s,
          o = t.v;
      e *= 6;
      var n = Math.floor(e),
          s = e - n,
          r = o * (1 - i),
          h = o * (1 - s * i),
          u = o * (1 - (1 - s) * i),
          a = n % 6;
      return {
        r: [o, h, r, r, u, o][a],
        g: [u, o, o, h, r, r][a],
        b: [r, r, u, o, o, h][a]
      };
    }(this._hsva),
        n = o.g,
        r = o.b;

    this._rgba.r = o.r, this._rgba.g = n, this._rgba.b = r, this._hexString = function (t) {
      var e = t.g,
          i = t.b;
      return ["#", s(Math.round(255 * t.r).toString(16)), s(Math.round(255 * e).toString(16)), s(Math.round(255 * i).toString(16))].join("").toUpperCase();
    }(this._rgba), this._hexNumber = h(this._hexString), this._updateBrightness();
  }, o._updateBrightness = function () {
    var t = this._rgba;
    this._brightness = (299 * t.r + 587 * t.g + 114 * t.b) / 1e3, this._isDark = this._brightness < .5, this._isLight = !this._isDark;
  }, e(t, [{
    key: "rgb",
    get: function () {
      return this._rgba;
    }
  }, {
    key: "hsv",
    get: function () {
      return this._hsva;
    }
  }, {
    key: "hex",
    get: function () {
      return this._hexNumber;
    }
  }, {
    key: "hexString",
    get: function () {
      return this._hexString;
    }
  }, {
    key: "brightness",
    get: function () {
      return this._brightness;
    }
  }, {
    key: "isDark",
    get: function () {
      return this._isDark;
    }
  }, {
    key: "isLight",
    get: function () {
      return this._isLight;
    }
  }]), t;
}();

function h(t) {
  return parseInt(t.replace("#", ""), 16);
}

var u = function () {
  function t(t) {
    var e = this;
    void 0 === t && (t = {}), this._widthUnits = "px", this._heightUnits = "px", this._huePosition = 0, this._hueHeight = 0, this._maxHue = 0, this._inputIsNumber = !1, this._saturationWidth = 0, this._isChoosing = !1, this._callbacks = [], this.width = 0, this.height = 0, this.hue = 0, this.position = {
      x: 0,
      y: 0
    }, this.color = new r(0), this.backgroundColor = new r(0), this.hueColor = new r(0), this._onSaturationMouseDown = function (t) {
      var i = e.$saturation.getBoundingClientRect(),
          o = n(t),
          s = o.x,
          r = o.y;
      e._isChoosing = !0, e._moveSelectorTo(s - i.left, r - i.top), e._updateColorFromPosition(), e._window.addEventListener("mouseup", e._onSaturationMouseUp), e._window.addEventListener("touchend", e._onSaturationMouseUp), e._window.addEventListener("mousemove", e._onSaturationMouseMove), e._window.addEventListener("touchmove", e._onSaturationMouseMove), t.preventDefault();
    }, this._onSaturationMouseMove = function (t) {
      var i = e.$saturation.getBoundingClientRect(),
          o = n(t);
      e._moveSelectorTo(o.x - i.left, o.y - i.top), e._updateColorFromPosition();
    }, this._onSaturationMouseUp = function () {
      e._isChoosing = !1, e._window.removeEventListener("mouseup", e._onSaturationMouseUp), e._window.removeEventListener("touchend", e._onSaturationMouseUp), e._window.removeEventListener("mousemove", e._onSaturationMouseMove), e._window.removeEventListener("touchmove", e._onSaturationMouseMove);
    }, this._onHueMouseDown = function (t) {
      var i = e.$hue.getBoundingClientRect(),
          o = n(t).y;
      e._isChoosing = !0, e._moveHueTo(o - i.top), e._updateHueFromPosition(), e._window.addEventListener("mouseup", e._onHueMouseUp), e._window.addEventListener("touchend", e._onHueMouseUp), e._window.addEventListener("mousemove", e._onHueMouseMove), e._window.addEventListener("touchmove", e._onHueMouseMove), t.preventDefault();
    }, this._onHueMouseMove = function (t) {
      var i = e.$hue.getBoundingClientRect(),
          o = n(t);
      e._moveHueTo(o.y - i.top), e._updateHueFromPosition();
    }, this._onHueMouseUp = function () {
      e._isChoosing = !1, e._window.removeEventListener("mouseup", e._onHueMouseUp), e._window.removeEventListener("touchend", e._onHueMouseUp), e._window.removeEventListener("mousemove", e._onHueMouseMove), e._window.removeEventListener("touchmove", e._onHueMouseMove);
    }, this._window = t.window || window, this._document = this._window.document, this.$el = this._document.createElement("div"), this.$el.className = "Scp", this.$el.innerHTML = '\n      <div class="Scp-saturation">\n        <div class="Scp-brightness"></div>\n        <div class="Scp-sbSelector"></div>\n      </div>\n      <div class="Scp-hue">\n        <div class="Scp-hSelector"></div>\n      </div>\n    ', this.$saturation = this.$el.querySelector(".Scp-saturation"), this.$hue = this.$el.querySelector(".Scp-hue"), this.$sbSelector = this.$el.querySelector(".Scp-sbSelector"), this.$hSelector = this.$el.querySelector(".Scp-hSelector"), this.$saturation.addEventListener("mousedown", this._onSaturationMouseDown), this.$saturation.addEventListener("touchstart", this._onSaturationMouseDown), this.$hue.addEventListener("mousedown", this._onHueMouseDown), this.$hue.addEventListener("touchstart", this._onHueMouseDown), t.el && this.appendTo(t.el), t.background && this.setBackgroundColor(t.background), t.widthUnits && (this._widthUnits = t.widthUnits), t.heightUnits && (this._heightUnits = t.heightUnits), this.setSize(t.width || 175, t.height || 150), this.setColor(t.color);
  }

  var s = t.prototype;
  return s.appendTo = function (t) {
    return "string" == typeof t ? document.querySelector(t).appendChild(this.$el) : t.appendChild(this.$el), this;
  }, s.remove = function () {
    this._callbacks = [], this._onSaturationMouseUp(), this._onHueMouseUp(), this.$saturation.removeEventListener("mousedown", this._onSaturationMouseDown), this.$saturation.removeEventListener("touchstart", this._onSaturationMouseDown), this.$hue.removeEventListener("mousedown", this._onHueMouseDown), this.$hue.removeEventListener("touchstart", this._onHueMouseDown), this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
  }, s.setColor = function (t) {
    this._inputIsNumber = i(t), this.color.fromHex(t);
    var e = this.color.hsv,
        o = e.h,
        n = e.s,
        s = e.v;
    return isNaN(o) || (this.hue = o), this._moveSelectorTo(this._saturationWidth * n, (1 - s) * this._hueHeight), this._moveHueTo((1 - this.hue) * this._hueHeight), this._updateHue(), this;
  }, s.setSize = function (t, e) {
    return this.width = t, this.height = e, this.$el.style.width = this.width + this._widthUnits, this.$el.style.height = this.height + this._heightUnits, this._saturationWidth = this.width - 25, this.$saturation.style.width = this._saturationWidth + "px", this._hueHeight = this.height, this._maxHue = this._hueHeight - 2, this;
  }, s.setBackgroundColor = function (t) {
    return this.backgroundColor.fromHex(t), this.$el.style.padding = "5px", this.$el.style.background = this.backgroundColor.hexString, this;
  }, s.setNoBackground = function () {
    return this.$el.style.padding = "0px", this.$el.style.background = "none", this;
  }, s.onChange = function (t) {
    return this._callbacks.indexOf(t) < 0 && (this._callbacks.push(t), t(this.getHexString())), this;
  }, s.getColor = function () {
    return this._inputIsNumber ? this.getHexNumber() : this.getHexString();
  }, s.getHexString = function () {
    return this.color.hexString.toUpperCase();
  }, s.getHexNumber = function () {
    return this.color.hex;
  }, s.getRGB = function () {
    return this.color.rgb;
  }, s.getHSV = function () {
    return this.color.hsv;
  }, s.isDark = function () {
    return this.color.isDark;
  }, s.isLight = function () {
    return this.color.isLight;
  }, s._moveSelectorTo = function (t, e) {
    this.position.x = o(t, 0, this._saturationWidth), this.position.y = o(e, 0, this._hueHeight), this.$sbSelector.style.transform = "translate(" + this.position.x + "px, " + this.position.y + "px)";
  }, s._updateColorFromPosition = function () {
    this.color.fromHsv({
      h: this.hue,
      s: this.position.x / this._saturationWidth,
      v: 1 - this.position.y / this._hueHeight
    }), this._updateColor();
  }, s._moveHueTo = function (t) {
    this._huePosition = o(t, 0, this._maxHue), this.$hSelector.style.transform = "translateY(" + this._huePosition + "px)";
  }, s._updateHueFromPosition = function () {
    var t = this.getHSV();
    this.hue = 1 - this._huePosition / this._maxHue, this.color.fromHsv({
      h: this.hue,
      s: t.s,
      v: t.v
    }), this._updateHue();
  }, s._updateHue = function () {
    this.hueColor.fromHsv({
      h: this.hue,
      s: 1,
      v: 1
    }), this.$saturation.style.background = "linear-gradient(to right, #fff, " + this.hueColor.hexString + ")", this._updateColor();
  }, s._updateColor = function () {
    this.$sbSelector.style.background = this.getHexString(), this.$sbSelector.style.borderColor = this.isDark() ? "#fff" : "#000", this._triggerChange();
  }, s._triggerChange = function () {
    var t = this;

    this._callbacks.forEach(function (e) {
      return e(t.getHexString());
    });
  }, e(t, [{
    key: "isChoosing",
    get: function () {
      return this._isChoosing;
    }
  }]), t;
}();

!function (t, e) {
  void 0 === e && (e = {});
  var i = e.insertAt;

  if ("undefined" != typeof document) {
    var o = document.head || document.getElementsByTagName("head")[0],
        n = document.createElement("style");
    n.type = "text/css", "top" === i && o.firstChild ? o.insertBefore(n, o.firstChild) : o.appendChild(n), n.styleSheet ? n.styleSheet.cssText = t : n.appendChild(document.createTextNode(t));
  }
}(".Scp{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative}.Scp-saturation{position:relative;height:100%;background:linear-gradient(90deg,#fff,red);float:left;margin-right:5px}.Scp-brightness{width:100%;height:100%;background:linear-gradient(hsla(0,0%,100%,0),#000)}.Scp-sbSelector{border:2px solid #fff;position:absolute;width:14px;height:14px;background:#fff;border-radius:10px;top:-7px;left:-7px;box-sizing:border-box;z-index:10}.Scp-hue{width:20px;height:100%;position:relative;float:left;background:linear-gradient(red,#f0f 17%,#00f 34%,#0ff 50%,#0f0 67%,#ff0 84%,red)}.Scp-hSelector{position:absolute;background:#fff;border-bottom:1px solid #000;right:-3px;width:10px;height:2px}", {
  insertAt: "top"
});
var _default = u;
exports.default = _default;
},{}],"src/state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* 
    isDrawing - bool
    canvas - obj
    ctx - obj
    currentBrushInfo - obj
    currentStroke - obj
    currentPoint - obj
    lastPoint - obj
    prevStrokes - arr
    undoneStrokes - arr
*/
var state = {
  isDrawing: isDrawing,
  canvas: canvas,
  ctx: ctx,
  currentBrushInfo: currentBrushInfo,
  currentStroke: currentStroke,
  currentPoint: currentPoint,
  lastPoint: lastPoint,
  prevStrokes: prevStrokes,
  undoneStrokes: undoneStrokes
};
var _default = state;
exports.default = _default;
},{}],"src/BrushInfo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var BrushInfo = /*#__PURE__*/function () {
  function BrushInfo(properties) {
    _classCallCheck(this, BrushInfo);

    _defineProperty(this, "HARD_ROUND_BRUSH", "HARD_ROUND_BRUSH");

    _defineProperty(this, "defaults", {
      color: "#000000",
      size: 1,
      spacing: 1,
      opacity: 1.0,
      type: this.HARD_ROUND_BRUSH
    });

    for (propName in this.defaults) {
      if (this.defaults.hasOwnProperty(propName)) {
        this[propName] = this.defaults[propName];
      }
    }

    for (propName in properties) {
      if (properties.hasOwnProperty(propName)) {
        this[propName] = properties[propName];
      }
    }
  } // Brush types


  _createClass(BrushInfo, [{
    key: "setColor",
    value: function setColor(canvasContext, color) {
      canvasContext.fillStyle = color;
    }
  }]);

  return BrushInfo;
}();

exports.default = BrushInfo;
},{}],"src/history.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _state = _interopRequireDefault(require("./state"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prevStrokes = _state.default.prevStrokes,
    undoneStrokes = _state.default.undoneStrokes,
    currentStroke = _state.default.currentStroke,
    canvas = _state.default.canvas,
    ctx = _state.default.ctx,
    currentBrushInfo = _state.default.currentBrushInfo;

var history = function () {
  function addPointToStroke(x, y) {
    var point = [x, y];
    currentStroke.points.push(point);
  }

  function addStrokeToHistory(stroke) {
    prevStrokes.push(stroke);
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function redrawCanvas() {
    if (prevStrokes.length > 0) {
      prevStrokes.forEach(function (stroke) {
        var selectedColor = currentBrushInfo.color;
        var size = stroke.brushInfo.size;
        var strokeColor = stroke.brushInfo.color;
        ctx.fillStyle = strokeColor;
        stroke.points.forEach(function (point) {
          var x = point[0];
          var y = point[1];
          drawCircle(ctx, x, y, size);
        });
        ctx.fillStyle = selectedColor;
      });
    }
  }

  function undoStroke() {
    if (prevStrokes.length > 0) {
      var undoneStroke = prevStrokes.pop();
      undoneStrokes.push(undoneStroke);
      clearCanvas();
      redrawCanvas();
    }

    console.log("Undone strokes:");
    console.log(undoneStrokes);
  }

  function redoStroke() {
    if (undoneStrokes.length > 0) {
      var strokeToRedo = undoneStrokes.pop();
      prevStrokes.push(strokeToRedo);
      clearCanvas();
      redrawCanvas();
    } else return;
  }

  return {
    addPointToStroke: addPointToStroke,
    addStrokeToHistory: addStrokeToHistory,
    undoStroke: undoStroke,
    redoStroke: redoStroke,
    clearCanvas: clearCanvas
  };
}();

var _default = history;
exports.default = _default;
},{"./state":"src/state.js"}],"src/brush.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _BrushInfo = _interopRequireDefault(require("./BrushInfo"));

var _state = _interopRequireDefault(require("./state"));

var _history = _interopRequireDefault(require("./history"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

var canvas = _state.default.canvas,
    currentPoint = _state.default.currentPoint,
    lastPoint = _state.default.lastPoint,
    currentStroke = _state.default.currentStroke,
    currentBrushInfo = _state.default.currentBrushInfo;

var brush = function () {
  function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
  }

  function angleBetween(point1, point2) {
    return Math.atan2(point2.x - point1.x, point2.y - point1.y);
  }

  function getPointerPositionOnCanvas(e) {
    var rect = canvas.getBoundingClientRect();
    var x = e.pageX - rect.left - window.pageXOffset;
    var y = e.pageY - rect.top - window.pageYOffset;
    return {
      x: x,
      y: y
    };
  }

  function drawCircle(context, x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, false, Math.PI * 2);
    context.closePath();
    context.fill();
  }

  function onPointerDown(e) {
    isDrawing = true;

    var _getPointerPositionOn = getPointerPositionOnCanvas(e),
        x = _getPointerPositionOn.x,
        y = _getPointerPositionOn.y;

    lastPoint = (_readOnlyError("lastPoint"), {
      x: x,
      y: y
    });
    currentStroke.points = [];
    currentStroke.brushInfo = new _BrushInfo.default(currentBrushInfo);
    drawCircle(ctx, x, y, currentBrushInfo.size);

    _history.default.addPointToStroke(x, y);
  }

  function onPointerMove(e) {
    if (!isDrawing) return;

    var _getPointerPositionOn2 = getPointerPositionOnCanvas(e),
        x = _getPointerPositionOn2.x,
        y = _getPointerPositionOn2.y;

    currentPoint = (_readOnlyError("currentPoint"), {
      x: x,
      y: y
    });
    var dist = distanceBetween(lastPoint, currentPoint);
    var angle = angleBetween(lastPoint, currentPoint);
    var spacing = currentBrushInfo.spacing; // Paints in between points to prevent gaps when drawing quickly

    for (var i = 0; i < dist; i += spacing) {
      var _x = lastPoint.x + Math.sin(angle) * i;

      var _y = lastPoint.y + Math.cos(angle) * i;

      drawCircle(ctx, _x, _y, currentBrushInfo.size);

      _history.default.addPointToStroke(_x, _y);
    }

    lastPoint = (_readOnlyError("lastPoint"), currentPoint);
  }

  function onPointerUp() {
    isDrawing = false;
    currentPoint = (_readOnlyError("currentPoint"), {});
    strokePaths.push(currentStroke);
    undoneStrokes.length = 0;
    currentStroke = (_readOnlyError("currentStroke"), {});
    console.log("Stroke history:");
    console.log(strokePaths);
  }

  return {
    onPointerDown: onPointerDown,
    onPointerMove: onPointerMove,
    onPointerUp: onPointerUp
  };
}();

var _default = brush;
exports.default = _default;
},{"./BrushInfo":"src/BrushInfo.js","./state":"src/state.js","./history":"src/history.js"}],"src/canvas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCanvas = getCanvas;

function getCanvas(htmlElement, width, height) {
  var canvas = htmlElement;
  var ctx = canvas.getContext("2d");
  canvas.width = width * 2;
  canvas.height = height * 2;
  ctx.scale(2, 2);
  return {
    canvas: canvas,
    ctx: ctx
  };
}
},{}],"src/KikiPaint.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _simpleColorPicker = _interopRequireDefault(require("simple-color-picker"));

var _state = _interopRequireDefault(require("./state"));

var _BrushInfo = _interopRequireDefault(require("./BrushInfo"));

var _brush = _interopRequireDefault(require("./brush"));

var _canvas = require("./canvas");

var _history = _interopRequireDefault(require("./history"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }

var isDrawing = _state.default.isDrawing,
    canvas = _state.default.canvas,
    ctx = _state.default.ctx,
    currentBrushInfo = _state.default.currentBrushInfo,
    currentStroke = _state.default.currentStroke,
    currentPoint = _state.default.currentPoint,
    lastPoint = _state.default.lastPoint,
    prevStrokes = _state.default.prevStrokes,
    undoneStrokes = _state.default.undoneStrokes;

var KikiPaint = /*#__PURE__*/function () {
  function KikiPaint(options) {
    _classCallCheck(this, KikiPaint);

    var self = this;
    isDrawing = (_readOnlyError("isDrawing"), false);
    this.canvasObj = (0, _canvas.getCanvas)(options.canvasElement, options.canvasWidth, options.canvasHeight);
    this.colorPicker = new _simpleColorPicker.default({
      color: "#000000",
      el: document.getElementById("color-picker"),
      width: 180,
      height: 180
    });
    this.init();
  }

  _createClass(KikiPaint, [{
    key: "init",
    value: function init() {
      canvas = (_readOnlyError("canvas"), this.canvasObj.canvas);
      ctx = (_readOnlyError("ctx"), this.canvasObj.ctx);
      currentBrushInfo = (_readOnlyError("currentBrushInfo"), new _BrushInfo.default());
      currentStroke = (_readOnlyError("currentStroke"), {});
      currentPoint = (_readOnlyError("currentPoint"), {});
      lastPoint = (_readOnlyError("lastPoint"), {});
      prevStrokes = (_readOnlyError("prevStrokes"), []);
      undoneStrokes = (_readOnlyError("undoneStrokes"), []);
      this.colorPicker.onChange(function () {
        var newColor = colorPicker.getHexString();
        ctx.fillStyle = newColor;
        currentBrushInfo = (_readOnlyError("currentBrushInfo"), _objectSpread(_objectSpread({}, currentBrushInfo), {}, {
          color: newColor
        }));
      });
      canvas.addEventListener("pointerdown", _brush.default.onPointerDown);
      canvas.addEventListener("pointermove", _brush.default.onPointerMove);
      canvas.addEventListener("pointerup", _brush.default.onPointerUp);
      window.addEventListener("keydown", function (e) {
        if (e.ctrlKey && e.code == "KeyZ") {
          _history.default.undoStroke();
        }
      });
      window.addEventListener("keydown", function (e) {
        if (e.ctrlKey && e.code == "KeyY") {
          _history.default.redoStroke();
        }
      });
    }
  }]);

  return KikiPaint;
}();

exports.default = KikiPaint;
},{"simple-color-picker":"node_modules/simple-color-picker/dist/simple-color-picker.module.js","./state":"src/state.js","./BrushInfo":"src/BrushInfo.js","./brush":"src/brush.js","./canvas":"src/canvas.js","./history":"src/history.js"}],"src/app.js":[function(require,module,exports) {
"use strict";

var _KikiPaint = _interopRequireDefault(require("./KikiPaint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("load", function () {
  new _KikiPaint.default({
    canvasElement: document.getElementById("canvas"),
    canvasWidth: 800,
    canvasHeight: 800
  });
});
},{"./KikiPaint":"src/KikiPaint.js"}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52752" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/app.js"], null)
//# sourceMappingURL=/app.a6a4d504.js.map