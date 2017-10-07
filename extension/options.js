function saveOptions(e) {
	e.preventDefault();
	browser.storage.local.set({
		speed: document.querySelector("#speed").value
	});
}

function restoreOptions() {

	function setCurrentChoice(result) {
		document.querySelector("#speed").value = result.speed || "500";
	}

	function onError(error) {
		console.log(`Error: ${error}`);
	}

	browser.storage.local.get("speed").then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
