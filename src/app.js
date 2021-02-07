const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800 * 2;
canvas.height = 800 * 2;
ctx.scale(2, 2);
ctx.fillStyle = "black";

const strokePaths = [];
const undoneStrokes = [];

let isDrawing = false;

let currentPoint = {};
let lastPoint = {};
let currentStroke = [];

let brushWidth = 1;

const distanceBetween = (point1, point2) => {
	return Math.sqrt(
		Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
	);
};

const angleBetween = (point1, point2) => {
	return Math.atan2(point2.x - point1.x, point2.y - point1.y);
};

const getPointerPositionOnCanvas = (pointerEvent) => {
	const rect = canvas.getBoundingClientRect();
	const x = pointerEvent.pageX - rect.left - window.pageXOffset;
	const y = pointerEvent.pageY - rect.top - window.pageYOffset;

	return { x, y };
};

const drawCircle = (context, x, y, radius) => {
	context.beginPath();
	context.arc(x, y, radius, false, Math.PI * 2);
	context.closePath();
	context.fill();
};

const onPointerDown = (e) => {
	isDrawing = true;
	const { x, y } = getPointerPositionOnCanvas(e);

	lastPoint = { x, y };

	drawCircle(ctx, x, y, brushWidth);
	addPointToStroke(x, y, brushWidth);
};

const onPointerMove = (e) => {
	if (!isDrawing) return;

	const { x, y } = getPointerPositionOnCanvas(e);
	currentPoint = { x, y };

	let dist = distanceBetween(lastPoint, currentPoint);
	let angle = angleBetween(lastPoint, currentPoint);
	let spacing = 2;

	// Paints in between points to create smoother lines without gaps
	for (let i = 0; i < dist; i += spacing) {
		let _x = lastPoint.x + Math.sin(angle) * i;
		let _y = lastPoint.y + Math.cos(angle) * i;

		drawCircle(ctx, _x, _y, brushWidth);
		addPointToStroke(_x, _y, brushWidth);
	}

	lastPoint = currentPoint;
};

const onPointerUp = () => {
	isDrawing = false;
	currentPoint = {};
	strokePaths.push(currentStroke);
	currentStroke = [];
	undoneStrokes.length = 0;
};

canvas.addEventListener("pointerdown", onPointerDown);
canvas.addEventListener("pointermove", onPointerMove);
canvas.addEventListener("pointerup", onPointerUp);

function addPointToStroke(x, y, width) {
	const point = { x, y, width };
	currentStroke.push(point);
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function redrawCanvas() {
	if (strokePaths.length > 0) {
		strokePaths.forEach((stroke) => {
			stroke.forEach((point) => {
				drawCircle(ctx, point.x, point.y, point.width);
			});
		});
	}
}

function undoStroke() {
	if (strokePaths.length > 0) {
		const undoneStroke = strokePaths.pop();
		undoneStrokes.push(undoneStroke);
		clearCanvas();
		redrawCanvas();
	}
}

function redoStroke() {
	if (undoneStrokes.length > 0) {
		const strokeToRedo = undoneStrokes.pop();
		strokePaths.push(strokeToRedo);
		clearCanvas();
		redrawCanvas();
	} else return;
}

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
