import state from "./state";

const {
	prevStrokes,
	undoneStrokes,
	currentStroke,
	canvas,
	ctx,
	currentBrushInfo,
} = state;

const history = (() => {
	function addPointToStroke(x, y) {
		const point = [x, y];
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
			prevStrokes.forEach((stroke) => {
				let selectedColor = currentBrushInfo.color;
				let size = stroke.brushInfo.size;
				let strokeColor = stroke.brushInfo.color;

				ctx.fillStyle = strokeColor;

				stroke.points.forEach((point) => {
					let x = point[0];
					let y = point[1];
					drawCircle(ctx, x, y, size);
				});

				ctx.fillStyle = selectedColor;
			});
		}
	}

	function undoStroke() {
		if (prevStrokes.length > 0) {
			const undoneStroke = prevStrokes.pop();
			undoneStrokes.push(undoneStroke);
			clearCanvas();
			redrawCanvas();
		}

		console.log(`Undone strokes:`);
		console.log(undoneStrokes);
	}

	function redoStroke() {
		if (undoneStrokes.length > 0) {
			const strokeToRedo = undoneStrokes.pop();
			prevStrokes.push(strokeToRedo);
			clearCanvas();
			redrawCanvas();
		} else return;
	}

	return {
		addPointToStroke,
		addStrokeToHistory,
		undoStroke,
		redoStroke,
		clearCanvas,
	};
})();

export default history;
