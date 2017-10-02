(function () {
	if (window.hasRun) {
		return;
	}
	window.hasRun = true;
	const readerId = 'readerIframe';
	const closeId = 'closeButton';
	const veilId = 'veil';

	function closeReader() {
		browser.runtime.sendMessage({
			id: closeId
		}).then(response => {
			document.getElementById(readerId).remove();
			const closeButton = document.getElementById(closeId);
			closeButton.removeEventListener("click", closeReader);
			closeButton.remove();
			const veil = document.getElementById(veilId);
			veil.removeEventListener("click", closeReader);
			veil.remove();
		}, err => console.error(err));
	}

	function createCloseButton() {
		let closeButton = document.getElementById(closeId);

		if (closeButton === null) {
			closeButton = document.createElement("div");
			closeButton.id = closeId;
			document.body.appendChild(closeButton);

			const icon = document.createElement("i");
			closeButton.appendChild(icon);
			icon.className = "icon-cancel";
			closeButton.addEventListener('click', closeReader);
		}
	}

	function showReaderFrame(request, sender, sendResponse) {
		let readerIframe = document.getElementById(readerId);

		if (readerIframe === null) {
			readerIframe = document.createElement("iframe");
			readerIframe.id = readerId;
			readerIframe.onload = () => {
				//get focus to accept keyboard events
				readerIframe.contentWindow.focus();
			};
			document.body.appendChild(readerIframe);
			createCloseButton();

			let veil = document.createElement("div");
			veil.id = veilId;
			document.body.appendChild(veil);
			veil.addEventListener('click', closeReader);
		}

		readerIframe.src = browser.extension.getURL(`dist/index.html?blobURL=${request.data}`);
		readerIframe.setAttribute("style", "width: 100vw; height: 230px;");
	}


	browser.runtime.onMessage.addListener(showReaderFrame);
})();
