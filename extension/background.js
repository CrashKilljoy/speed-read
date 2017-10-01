browser.contextMenus.create({
	id: "create-speed-read-box",
	title: "Copy link to clipboard",
	contexts: ["selection"],
});

browser.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "create-speed-read-box") {
		browser.tabs.executeScript(null, {
			file: "beastify.js"
		});

		var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
		gettingActiveTab.then((tabs) => {
			browser.tabs.sendMessage(tabs[0].id, {data: info.selectionText});
		});
	}
});
