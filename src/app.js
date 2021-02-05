const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800 * 2;
canvas.height = 600 * 2;
ctx.scale(2, 2);
ctx.fillStyle = "black";

let isDrawing = false;

let currentPoint = {};
let lastPoint = {};

let brushWidth = 2;

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
	}

	lastPoint = currentPoint;
};

const onPointerUp = () => {
	isDrawing = false;
	currentPoint = {};
};

canvas.addEventListener("pointerdown", onPointerDown);
canvas.addEventListener("pointermove", onPointerMove);
canvas.addEventListener("pointerup", onPointerUp);
