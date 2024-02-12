function sendMessageToBackground() {
	chrome.runtime.sendMessage({ action: "doSomething" }, function(response) {
		console.log("response from background script: ", response);
	});
}

document.getElementById("btnRecord").addEventListener("click", sendMessageToBackground);