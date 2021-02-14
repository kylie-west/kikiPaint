export default class BrushInfo {
	constructor(properties) {
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
	}

	// Brush types
	HARD_ROUND_BRUSH = "HARD_ROUND_BRUSH";
	// SOFT_ROUND_BRUSH = "SOFT_ROUND_BRUSH";
	// HARD_ERASER = "HARD_ERASER";
	// SOFT_ERASER = "SOFT_ERASER";
	// FILL = "FILL";

	defaults = {
		color: "#000000",
		size: 1,
		spacing: 1,
		opacity: 1.0,
		type: this.HARD_ROUND_BRUSH,
	};

	setColor(canvasContext, color) {
		canvasContext.fillStyle = color;
	}
}
