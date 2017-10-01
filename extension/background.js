browser.contextMenus.create({
	id: "create-speed-read-box",
	title: "Read text",
	contexts: ["selection"],
});

browser.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "create-speed-read-box") {
		browser.tabs.executeScript({
			file: "content_script.js"
		}).then(() => {
			const gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
			gettingActiveTab.then((tabs) => {
				browser.tabs.sendMessage(tabs[0].id, {data: info.selectionText});
				browser.tabs.insertCSS(tabs[0].id, {file: 'reader.css'});
			});
		}).catch(error => {
			console.error(`Could not inject content script: ${error}`);
		});
	}
});

function handleMessage(request, sender, sendResponse) {
	if (request.id === 'closeButton') {
		const gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
		gettingActiveTab.then((tabs) => {
			browser.tabs.removeCSS(tabs[0].id, {file: 'reader.css'});
		});
	}
	sendResponse({});
}

browser.runtime.onMessage.addListener(handleMessage);
