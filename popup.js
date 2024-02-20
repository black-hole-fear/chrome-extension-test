chrome.runtime.onMessage.addListener(async (message) => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if(message.action === 'startRecording' && message.body.currentTab.id === tabs[0].id) {
			startRecording(tabs[0].id);
		} else if(message.action === 'stopRecording' && message.body.currentTab.id === tabs[0].id) {
			stopRecording();
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
	const response = await chrome.storage.local.get('test');
	console.log("Final Result: ", response.test);
}

async function startCapture() {
	let arrTemp = [];
	arrTemp.push("test SessionData in frontend");
	await chrome.storage.local.set({'test': arrTemp});
	chrome.runtime.sendMessage({ name: 'initiateRecording' });
}

async function stopCapture() {
	chrome.runtime.sendMessage({ name: 'stopRecording' });
}

document.getElementById('startRecordingButton').addEventListener('click', startCapture);
document.getElementById('stopRecordingButton').addEventListener('click', stopCapture);
