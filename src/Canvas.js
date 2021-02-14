export function getCanvas(htmlElement, width, height) {
	const canvas = htmlElement;
	const ctx = canvas.getContext("2d");
	canvas.width = width * 2;
	canvas.height = height * 2;
	ctx.scale(2, 2);

	return { canvas, ctx };
}
