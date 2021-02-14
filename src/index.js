import KikiPaint from "./KikiPaint";

document.addEventListener("load", () => {
	new KikiPaint({
		canvasElement: document.getElementById("canvas"),
		canvasWidth: 800,
		canvasHeight: 800,
	});
});
