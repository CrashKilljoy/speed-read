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
		var para = document.createElement("p");
		var node = document.createTextNode(request.data);
		para.appendChild(node);

		document.body.appendChild(para);
	}

	browser.runtime.onMessage.addListener(beastify);

})();
