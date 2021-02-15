import autoBind from "auto-bind";
import BrushInfo from "./BrushInfo";
import MainGUI from "./MainGUI";

export default class KikiPaint {
	constructor(options) {
		this.parentElement = options.parentElement;
		this.width = options.width;
		this.height = options.height;

		this.isDrawing = false;
		this.currentBrushInfo = new BrushInfo();

		this.MainGUI = new MainGUI(this);

		autoBind(this);
	}

	setCurrentBrushInfo(brushInfo) {
		this.currentBrushInfo = brushInfo;
		return this.currentBrushInfo;
	}

	getCurrentBrushInfo() {
		return this.currentBrushInfo;
	}
}
