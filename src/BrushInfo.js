export default class BrushInfo {
	constructor(properties) {
		// Brush types
		let HARD_ROUND_BRUSH = "HARD_ROUND_BRUSH";
		// SOFT_ROUND_BRUSH = "SOFT_ROUND_BRUSH";
		// HARD_ERASER = "HARD_ERASER";
		// SOFT_ERASER = "SOFT_ERASER";
		// FILL = "FILL";

		let defaults = {
			color: "#000000",
			size: 1,
			spacing: 1,
			opacity: 1.0,
			type: HARD_ROUND_BRUSH,
		};
		for (const propName in defaults) {
			if (defaults.hasOwnProperty(propName)) {
				this[propName] = defaults[propName];
			}
		}

		for (const propName in properties) {
			if (properties.hasOwnProperty(propName)) {
				this[propName] = properties[propName];
			}
		}
	}
}
