import KikiPaint from "./KikiPaint";
import History from "./History";

export default class Brush {
	constructor(canvas, ctx) {
		this.canvas = canvas;
		this.ctx = ctx;
	}

	static distanceBetween(point1, point2) {
		return Math.sqrt(
			Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
		);
	}

	static angleBetween(point1, point2) {
		return Math.atan2(point2.x - point1.x, point2.y - point1.y);
	}

	static getPointerPositionOnCanvas(pointerEvent, canvas) {
		const rect = canvas.getBoundingClientRect();
		const x = pointerEvent.pageX - rect.left - window.pageXOffset;
		const y = pointerEvent.pageY - rect.top - window.pageYOffset;

		return { x, y };
	}

	static drawCircle(context, x, y, radius) {
		context.beginPath();
		context.arc(x, y, radius, false, Math.PI * 2);
		context.closePath();
		context.fill();
	}

	static onPointerDown(e, canvas, context) {
		const { setIsDrawing, setLastPoint } = KikiPaint;
		const { setCurrentStroke } = History;
		isDrawing = true;
		const { x, y } = this.getPointerPositionOnCanvas(e, canvas);

		lastPoint = { x, y };

		currentStroke.points = [];
		currentStroke.brushInfo = Object.assign({}, currentBrushInfo);

		this.drawCircle(context, x, y, currentBrushInfo.width);
		addPointToStroke(x, y);
	}
}
