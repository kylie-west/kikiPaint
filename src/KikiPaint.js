import ColorPicker from "simple-color-picker";
import state from "./state";
import BrushInfo from "./BrushInfo";
import brush from "./brush";
import { getCanvas } from "./canvas";
import history from "./history";

const {
	isDrawing,
	canvas,
	ctx,
	currentBrushInfo,
	currentStroke,
	currentPoint,
	lastPoint,
	prevStrokes,
	undoneStrokes,
} = state;

export default class KikiPaint {
	constructor(options) {
		let self = this;

		isDrawing = false;

		this.canvasObj = getCanvas(
			options.canvasElement,
			options.canvasWidth,
			options.canvasHeight
		);

		this.colorPicker = new ColorPicker({
			color: "#000000",
			el: document.getElementById("color-picker"),
			width: 180,
			height: 180,
		});

		this.init();
	}

	init() {
		canvas = this.canvasObj.canvas;
		ctx = this.canvasObj.ctx;
		currentBrushInfo = new BrushInfo();
		currentStroke = {};
		currentPoint = {};
		lastPoint = {};
		prevStrokes = [];
		undoneStrokes = [];

		this.colorPicker.onChange(() => {
			let newColor = colorPicker.getHexString();
			ctx.fillStyle = newColor;
			currentBrushInfo = {
				...currentBrushInfo,
				color: newColor,
			};
		});

		canvas.addEventListener("pointerdown", brush.onPointerDown);
		canvas.addEventListener("pointermove", brush.onPointerMove);
		canvas.addEventListener("pointerup", brush.onPointerUp);

		window.addEventListener("keydown", (e) => {
			if (e.ctrlKey && e.code == "KeyZ") {
				history.undoStroke();
			}
		});

		window.addEventListener("keydown", (e) => {
			if (e.ctrlKey && e.code == "KeyY") {
				history.redoStroke();
			}
		});
	}
}
