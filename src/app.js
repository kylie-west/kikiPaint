import KikiPaint from "./KikiPaint";

window.addEventListener("DOMContentLoaded", () => {
	new KikiPaint({
		parentElement: document.querySelector(".canvas__container"),
		width: 800,
		height: 800,
	});
});
