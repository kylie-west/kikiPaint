const { default: KikiPaint } = require("./KikiPaint");

import KikiPaint from "./KikiPaint";

document.addEventListener("DOMContentLoaded", () => {
	new KikiPaint({
		canvasElement: document.getElementById("canvas"),
		canvasWidth: 800,
		canvasHeight: 800,
	});
});
