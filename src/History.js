export default class History {
	constructor() {
		this.prevStrokes = [];
		this.undoneStrokes = [];
		this.currentStroke = { brushInfo: null, points: null };
	}

	static setCurrentStroke;

	addPointToStroke(x, y) {
		const point = [x, y];
		this.currentStroke.points.push(point);
	}

	addStrokeToHistory(stroke) {
		this.prevStrokes.push(stroke);
	}

	static clearCanvas(canvasContext) {
		canvasContext.clearRect(0, 0, canvas.width, canvas.height);
	}

	redrawCanvas(currBrushInfo, canvasContext) {
		if (this.prevStrokes.length > 0) {
			this.prevStrokes.forEach((stroke) => {
				let selectedColor = currBrushInfo.color;
				let width = stroke.brushInfo.width;
				let strokeColor = stroke.brushInfo.color;

				canvasContext.fillStyle = strokeColor;

				stroke.points.forEach((point) => {
					let x = point[0];
					let y = point[1];
					drawCircle(ctx, x, y, width);
				});

				canvasContext.fillStyle = selectedColor;
			});
		}
	}

	undoStroke() {
		if (prevStrokes.length > 0) {
			const undoneStroke = prevStrokes.pop();
			this.undoneStrokes.push(undoneStroke);
			this.clearCanvas();
			this.redrawCanvas();
		}

		console.log(`Undone strokes:`);
		console.log(this.undoneStrokes);
	}

	redoStroke() {
		if (undoneStrokes.length > 0) {
			const strokeToRedo = undoneStrokes.pop();
			this.prevStrokes.push(strokeToRedo);
			this.clearCanvas();
			this.redrawCanvas();
		} else return;
	}
}
