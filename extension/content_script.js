(function () {
	if (window.hasRun) {
		return;
	}
	window.hasRun = true;

	function removeEverything() {
		while (document.body.firstChild) {
			document.body.firstChild.remove();
		}
	}

	function beastify(request, sender, sendResponse) {
		removeEverything();

		const insertImage = document.createElement("iframe");
		insertImage.setAttribute("src", browser.extension.getURL(`dist/index.html?blobURL=${request.data}`));
		insertImage.setAttribute("style", "width: 100vw; height: 100vh;");

		document.body.appendChild(insertImage);
	}

	browser.runtime.onMessage.addListener(beastify);

})();
