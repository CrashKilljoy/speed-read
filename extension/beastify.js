/*
beastify():
* removes every node in the document.body,
* then inserts the chosen beast
* then removes itself as a listener 
*/
function beastify(request, sender, sendResponse) {
	removeEverything();	
	var para = document.createElement("p");
	var node = document.createTextNode(request.data);
	para.appendChild(node);

    document.body.appendChild(para);

	browser.runtime.onMessage.removeListener(beastify);
}

/*
Remove every node under document.body
*/
function removeEverything() {
  while (document.body.firstChild) {
    document.body.firstChild.remove();
  }
}

/*
Assign beastify() as a listener for messages from the extension.
*/
browser.runtime.onMessage.addListener(beastify);
