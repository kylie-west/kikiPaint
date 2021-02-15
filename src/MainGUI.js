import Canvas from "./Canvas";
import ColorPicker from "simple-color-picker";

export default class MainGUI {
	constructor(controller) {
		this.controller = controller;

		this.canvas = new Canvas(controller);

		this.colorPicker = new ColorPicker({
			color: "#000000",
			el: document.getElementById("color-picker"),
			width: 180,
			height: 180,
		});

		let _this = this;
		this.colorPicker.onChange(() => {
			let newColor = this.colorPicker.getHexString();
			_this.canvas.setCurrentColor(newColor);
		});
	}
}
