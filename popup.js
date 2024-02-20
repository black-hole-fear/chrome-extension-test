chrome.runtime.onMessage.addListener(async (message) => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if(message.action === 'startRecording' && message.body.currentTab.id === tabs[0].id) {
			startRecording(tabs[0].id);
			console.log("Successed!");
		}
	});
});

let recorder;
let data = [];

async function startRecording(streamId) {
	console.log("stream id is ", streamId);
	// if (recorder?.state === 'recording') {
	// 	throw new Error('Called startRecording while recording is in progress.');
	// }
	console.log("Loaded capturing audio...");
}

async function stopRecording() {
	recorder.stop();
	recorder.stream.getTracks().forEach((t) => t.stop());

	window.location.hash = '';
}

async function startCapture() {
	// let gArrTestValue = await chrome.storage.local.get(['test']);
	// gArrTestValue.test({"test SessionData in frontend"});
	// await chrome.storage.local.set("test", gArrTestValue);
	chrome.runtime.sendMessage({ name: 'initiateRecording' });
}

async function stopCapture() {
	const strPrint = await chrome.storage.local.get(["test"]);
	console.log(`local value:${strPrint}`);
	chrome.runtime.sendMessage({ name: 'stopRecording' });
}

document.getElementById('startRecordingButton').addEventListener('click', startCapture);
document.getElementById('stopRecordingButton').addEventListener('click', stopCapture);
