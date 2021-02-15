import autoBind from "auto-bind";
import BrushInfo from "./BrushInfo";

export default class Canvas {
	canvasWrapper;
	canvas;
	ctx;

	constructor(controller) {
		this.controller = controller;

		this.currentStroke = {};
		this.currentPoint = {};
		this.lastPoint = {};
		this.prevStrokes = [];
		this.undoneStrokes = [];

		autoBind(this);

		this.makeCanvas();
	}

	addPointToStroke(x, y) {
		let point = [x, y];
		this.currentStroke.points.push(point);
		return this.currentStroke;
	}

	addStrokeToHistory(stroke) {
		this.prevStrokes.push(stroke);
		return this.prevStrokes;
	}

	distanceBetween(point1, point2) {
		return Math.sqrt(
			Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
		);
	}

	angleBetween(point1, point2) {
		return Math.atan2(point2.x - point1.x, point2.y - point1.y);
	}

	getPointerPositionOnCanvas(e) {
		const rect = this.canvas.getBoundingClientRect();
		const x = e.pageX - rect.left - window.pageXOffset;
		const y = e.pageY - rect.top - window.pageYOffset;

		return { x, y };
	}

	drawCircle(x, y, radius) {
		this.ctx.beginPath();
		this.ctx.arc(x, y, radius, false, Math.PI * 2);
		this.ctx.closePath();
		this.ctx.fill();
	}

	handlePointerDown(e) {
		this.isDrawing = true;
		const { x, y } = this.getPointerPositionOnCanvas(e);

		this.lastPoint = { x, y };

		let currBrushInfo = this.controller.getCurrentBrushInfo();
		this.currentStroke = {
			points: [],
			brushInfo: new BrushInfo(currBrushInfo),
		};

		this.drawCircle(x, y, currBrushInfo.size * 0.5);
		this.addPointToStroke(x, y);
	}

	handlePointerMove(e) {
		let _this = this;

		if (!this.isDrawing) return;

		const { x, y } = this.getPointerPositionOnCanvas(e);
		this.currentPoint = { x, y };

		let dist = this.distanceBetween(this.lastPoint, this.currentPoint);
		let angle = this.angleBetween(this.lastPoint, this.currentPoint);
		let currBrushInfo = this.controller.getCurrentBrushInfo();
		let spacing = currBrushInfo.spacing;

		// Paints in between points to prevent gaps when drawing quickly
		for (let i = 0; i < dist; i += spacing) {
			let _x = _this.lastPoint.x + Math.sin(angle) * i;
			let _y = _this.lastPoint.y + Math.cos(angle) * i;

			this.drawCircle(_x, _y, currBrushInfo.size * 0.5);
			_this.addPointToStroke(_x, _y);
		}

		this.lastPoint = this.currentPoint;
	}

	handlePointerUp() {
		this.isDrawing = false;
		this.currentPoint = {};
		this.lastPoint = {};
		this.prevStrokes.push(this.currentStroke);
		this.undoneStrokes.length = 0;
		this.currentStroke = {};

		console.log(`Stroke history:`);
		console.log(this.prevStrokes);
	}

	setCurrentColor(color) {
		this.ctx.fillStyle = color;
		let brushInfo = this.controller.getCurrentBrushInfo();
		this.controller.setCurrentBrushInfo({ ...brushInfo, color });
	}

	clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	redrawCanvas() {
		let currBrushInfo = this.controller.getCurrentBrushInfo(),
			lastSelectedColor = currBrushInfo.color,
			_this = this;

		if (this.prevStrokes.length > 0) {
			_this.prevStrokes.forEach((stroke) => {
				let size = stroke.brushInfo.size * 0.5,
					strokeColor = stroke.brushInfo.color;

				_this.ctx.fillStyle = strokeColor;

				stroke.points.forEach((point) => {
					let x = point[0],
						y = point[1];
					_this.drawCircle(x, y, size);
				});
			});
		}

		this.ctx.fillStyle = lastSelectedColor;
	}

	undoStroke() {
		let _this = this;

		if (this.prevStrokes.length > 0) {
			let undoneStroke = _this.prevStrokes.pop();
			_this.undoneStrokes.push(undoneStroke);

			_this.clearCanvas();
			_this.redrawCanvas();
		}

		console.log(`Undone strokes:`);
		console.log(this.undoneStrokes);
	}

	redoStroke() {
		let _this = this;

		if (this.undoneStrokes.length > 0) {
			let strokeToRedo = _this.undoneStrokes.pop();
			_this.prevStrokes.push(strokeToRedo);

			_this.clearCanvas();
			_this.redrawCanvas();
		} else return;
	}

	makeCanvas() {
		console.log(this.controller);

		let _this = this;

		const { width, height, parentElement } = this.controller;

		this.canvasWrapper = document.createElement("div");
		this.canvas = document.createElement("canvas");
		this.ctx = this.canvas.getContext("2d");

		this.canvasWrapper.className = "canvas__wrapper";
		this.canvasWrapper.style.width = `${width}px`;
		this.canvasWrapper.style.height = `${height}px`;
		this.canvasWrapper.style.backgroundColor = `#FFFFFF`;

		this.canvas.width = width * 2;
		this.canvas.height = height * 2;
		this.canvas.style.width = `${width}px`;
		this.canvas.style.height = `${height}px`;

		this.ctx.scale(2, 2);

		this.canvasWrapper.appendChild(this.canvas);
		parentElement.appendChild(this.canvasWrapper);

		this.canvas.addEventListener("pointerdown", this.handlePointerDown);
		this.canvas.addEventListener("pointermove", this.handlePointerMove);
		this.canvas.addEventListener("pointerup", this.handlePointerUp);

		window.addEventListener("keydown", (e) => {
			if (e.ctrlKey && e.code == "KeyZ") {
				_this.undoStroke();
			}
		});

		window.addEventListener("keydown", (e) => {
			if (e.ctrlKey && e.code == "KeyY") {
				_this.redoStroke();
			}
		});
	}
}
