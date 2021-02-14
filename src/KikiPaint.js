import ColorPicker from "simple-color-picker";
import Canvas from "./Canvas";
import BrushInfo from "./BrushInfo";
import History from "./History";
import Brush from "./brush";

export default class KikiPaint {
	constructor(options) {
		this.canvasObj = new Canvas(
			options.element,
			options.element.clientWidth,
			options.element.clientHeight
		);

		this.canvas = this.canvasObj.initCanvas();
		this.canvasElement = this.canvas.element;
		this.ctx = this.canvas.ctx;

		this.colorPicker = new ColorPicker({
			color: "#000000",
			el: document.getElementById("color-picker"),
			width: 180,
			height: 180,
		});

		this.history = new History();

		this.isDrawing = false;
		this.currentBrushInfo = new BrushInfo();
		this.currentStroke = {};
		this.currentPoint = {};
		this.lastPoint = {};

		this.initEventListeners();
	}

	static setIsDrawing = (value) => {
		this.isDrawing = value;
	};

	static setCurrentBrushInfo = (value) => {
		this.currentBrushInfo = value;
	};

	static setCurrentPoint = (value) => {
		this.currentPoint = value;
	};

	static setLastPoint = (value) => {
		this.lastPoint = value;
	};

	initEventListeners() {
		colorPicker.onChange(() => {
			let newColor = colorPicker.getHexString();
			this.ctx.fillStyle = newColor;
			this.setState(currentBrushInfo, {
				...this.state.currentBrushInfo,
				color: newColor,
			});
		});

		this.canvasElement.addEventListener("pointerdown", (e) => {
			this.state.isDrawing = true;
			Brush.onPointerDown(e, this.canvasElement, this.canvasContext);
		});
		this.canvasElement.addEventListener("pointermove", onPointerMove);
		this.canvasElement.addEventListener("pointerup", onPointerUp);

		window.addEventListener("keydown", (e) => {
			if (e.ctrlKey && e.code == "KeyZ") {
				undoStroke();
			}
		});

		window.addEventListener("keydown", (e) => {
			if (e.ctrlKey && e.code == "KeyY") {
				redoStroke();
			}
		});
	}
}
