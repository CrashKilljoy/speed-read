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
			});
		}).catch(error => {
				console.error(`Could not inject content script: ${error}`);
			});
	}
});
