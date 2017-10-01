(function () {
	if (window.hasRun) {
		return;
	}
	window.hasRun = true;

	function showReaderFrame(request, sender, sendResponse) {
		const readerId = 'readerIframe';
		let readerIframe = document.getElementById(readerId);

		if (readerIframe === null) {
			readerIframe = document.createElement("iframe");
			readerIframe.id = readerId;
		}
		
		readerIframe.src = browser.extension.getURL(`dist/index.html?blobURL=${request.data}`);
		readerIframe.setAttribute("style", "width: 100vw; height: 230px;");

		document.body.appendChild(readerIframe);
	}

	browser.runtime.onMessage.addListener(showReaderFrame);
})();
