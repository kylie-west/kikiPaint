import ColorPicker from "simple-color-picker";

// Set up canvas

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800 * 2;
canvas.height = 800 * 2;
ctx.scale(2, 2);
ctx.fillStyle = "#000";

const colorPicker = new ColorPicker({
	color: "#000000",
	el: document.getElementById("color-picker"),
	width: 180,
	height: 180,
});

let isDrawing = false;
let currentPoint = {};
let lastPoint = {};

const strokePaths = [];
const undoneStrokes = [];

// Set default brush info
const currentBrushInfo = {
	style: "pencil",
	color: "#000000",
	width: 1,
};

// Information about the stroke currently being drawn
let currentStroke = {
	points: [],
	brushInfo: { style: null, color: null, width: null },
};

function distanceBetween(point1, point2) {
	return Math.sqrt(
		Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
	);
}

function angleBetween(point1, point2) {
	return Math.atan2(point2.x - point1.x, point2.y - point1.y);
}

function getPointerPositionOnCanvas(pointerEvent) {
	const rect = canvas.getBoundingClientRect();
	const x = pointerEvent.pageX - rect.left - window.pageXOffset;
	const y = pointerEvent.pageY - rect.top - window.pageYOffset;

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
	currentStroke.brushInfo = Object.assign({}, currentBrushInfo);

	drawCircle(ctx, x, y, currentBrushInfo.width);
	addPointToStroke(x, y);
}

function onPointerMove(e) {
	if (!isDrawing) return;

	const { x, y } = getPointerPositionOnCanvas(e);
	currentPoint = { x, y };

	let dist = distanceBetween(lastPoint, currentPoint);
	let angle = angleBetween(lastPoint, currentPoint);
	let spacing = 2;

	// Paints in between points to prevent gaps when drawing quickly
	for (let i = 0; i < dist; i += spacing) {
		let _x = lastPoint.x + Math.sin(angle) * i;
		let _y = lastPoint.y + Math.cos(angle) * i;

		drawCircle(ctx, _x, _y, currentBrushInfo.width);
		addPointToStroke(_x, _y);
	}

	lastPoint = currentPoint;
}

function onPointerUp() {
	isDrawing = false;
	currentPoint = {};
	strokePaths.push(currentStroke); // Records stroke in stroke history array
	undoneStrokes.length = 0;
	currentStroke = {};

	console.log(`Stroke history:`);
	console.log(strokePaths);
}

function addPointToStroke(x, y) {
	const point = [x, y];
	currentStroke.points.push(point);
}

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Redraws the canvas using strokePaths array
function redrawCanvas() {
	if (strokePaths.length > 0) {
		strokePaths.forEach((stroke) => {
			let selectedColor = currentBrushInfo.color;
			let width = stroke.brushInfo.width;
			let strokeColor = stroke.brushInfo.color;

			ctx.fillStyle = strokeColor;

			// Loops through all the points in the stroke and redraws each one using the brush settings recorded in the stroke object
			stroke.points.forEach((point) => {
				let x = point[0];
				let y = point[1];
				drawCircle(ctx, x, y, width);
			});

			ctx.fillStyle = selectedColor;
		});
	}
}

// Removes most recent stroke from strokePaths, places into undoneStrokes array, then redraws canvas using the updated history
function undoStroke() {
	if (strokePaths.length > 0) {
		const undoneStroke = strokePaths.pop();
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
		strokePaths.push(strokeToRedo);
		clearCanvas();
		redrawCanvas();
	} else return;
}

// Event listeners

canvas.addEventListener("pointerdown", onPointerDown);
canvas.addEventListener("pointermove", onPointerMove);
canvas.addEventListener("pointerup", onPointerUp);

colorPicker.onChange(() => {
	ctx.fillStyle = colorPicker.getHexString();
	currentBrushInfo.color = colorPicker.getHexString();
});

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
