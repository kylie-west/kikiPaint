export default class Canvas {
	constructor(htmlElement, width, height) {
		this.htmlElement = htmlElement;
		this.width = width;
		this.height = height;
	}

	initCanvas() {
		const canvas = document.getElementById(this.htmlElement);
		const ctx = canvas.getContext("2d");
		canvas.width = this.width * 2;
		canvas.height = this.height * 2;
		ctx.scale(2, 2);

		return { element: canvas, ctx };
	}
}
