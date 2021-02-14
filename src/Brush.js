import BrushInfo from "./BrushInfo";
import state from "./state";
import history from "./history";

const {
	canvas,
	currentPoint,
	lastPoint,
	currentStroke,
	currentBrushInfo,
} = state;

const brush = (function () {
	function distanceBetween(point1, point2) {
		return Math.sqrt(
			Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
		);
	}

	function angleBetween(point1, point2) {
		return Math.atan2(point2.x - point1.x, point2.y - point1.y);
	}

	function getPointerPositionOnCanvas(e) {
		const rect = canvas.getBoundingClientRect();
		const x = e.pageX - rect.left - window.pageXOffset;
		const y = e.pageY - rect.top - window.pageYOffset;

		return { x, y };
	}

	function drawCircle(context, x, y, radius) {
		context.beginPath();
		context.arc(x, y, radius, false, Math.PI * 2);
		context.closePath();
		context.fill();
	}

	function onPointerDown(e) {
		isDrawing = true;
		const { x, y } = getPointerPositionOnCanvas(e);

		lastPoint = { x, y };

		currentStroke.points = [];
		currentStroke.brushInfo = new BrushInfo(currentBrushInfo);

		drawCircle(ctx, x, y, currentBrushInfo.size);
		history.addPointToStroke(x, y);
	}

	function onPointerMove(e) {
		if (!isDrawing) return;

		const { x, y } = getPointerPositionOnCanvas(e);
		currentPoint = { x, y };

		let dist = distanceBetween(lastPoint, currentPoint);
		let angle = angleBetween(lastPoint, currentPoint);
		let spacing = currentBrushInfo.spacing;

		// Paints in between points to prevent gaps when drawing quickly
		for (let i = 0; i < dist; i += spacing) {
			let _x = lastPoint.x + Math.sin(angle) * i;
			let _y = lastPoint.y + Math.cos(angle) * i;

			drawCircle(ctx, _x, _y, currentBrushInfo.size);
			history.addPointToStroke(_x, _y);
		}

		lastPoint = currentPoint;
	}

	function onPointerUp() {
		isDrawing = false;
		currentPoint = {};
		strokePaths.push(currentStroke);
		undoneStrokes.length = 0;
		currentStroke = {};

		console.log(`Stroke history:`);
		console.log(strokePaths);
	}

	return { onPointerDown, onPointerMove, onPointerUp };
})();

export default brush;
