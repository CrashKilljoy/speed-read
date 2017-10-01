(function () {
	if (window.hasRun) {
		return;
	}
	window.hasRun = true;
	const readerId = 'readerIframe';
	const closeId = 'closeButton';

	function createCloseButton() {
		let closeButton = document.getElementById(closeId);

		if (closeButton === null) {
			closeButton = document.createElement("div");
			closeButton.id = closeId;
			document.body.appendChild(closeButton);

			const icon = document.createElement("i");
			closeButton.appendChild(icon);
			icon.className = "icon-close";
			icon.appendChild(document.createTextNode("close"));

			closeButton.addEventListener('click', () => {
				browser.runtime.sendMessage({
					id: closeId
				}).then(response => {
					document.getElementById(readerId).remove();
					document.getElementById(closeId).remove();
				}, err => console.error(err));
			});
		}
	}

	function showReaderFrame(request, sender, sendResponse) {
		let readerIframe = document.getElementById(readerId);

		if (readerIframe === null) {
			readerIframe = document.createElement("iframe");
			readerIframe.id = readerId;
			document.body.appendChild(readerIframe);
			createCloseButton();
		}

		readerIframe.src = browser.extension.getURL(`dist/index.html?blobURL=${request.data}`);
		readerIframe.setAttribute("style", "width: 100vw; height: 230px;");
	}

	browser.runtime.onMessage.addListener(showReaderFrame);
})();
