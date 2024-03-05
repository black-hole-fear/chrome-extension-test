let gArrTestValue = [];

var SessionData = (function () {

	async function get(key) {
		const [tab] = await chrome?.tabs?.query({
			active: true,
			currentWindow: true
		});
		var p = new Promise(function (resolve, reject) {
			chrome.scripting.executeScript({
				target: {
					tabId: tab.id
				},
				args: [key],
				function: function (key) {
					window.SessionData = window.SessionData || {};
					return window.SessionData[key];
				}
			}, function (response) {
				resolve(response[0]?.result);
			});
		});
		var data = await p;
		return data;
	}

	async function set(key, value) {
		const [tab] = await chrome?.tabs?.query({
			active: true,
			currentWindow: true
		});
		var p = new Promise(function (resolve, reject) {
			chrome.scripting.executeScript({
				target: {
					tabId: tab.id
				},
				args: [key, value],
				function: function (key, value) {
					window.SessionData = window.SessionData || {};
					window.SessionData[key] = value;
				}
			}, function (response) {
				resolve(response[0].result);
			});
		});
	}
	async function clear() {
		const [tab] = await chrome.tabs.query({
			active: true,
			currentWindow: true
		});
		var p = new Promise(function (resolve, reject) {
			chrome.scripting.executeScript({
				target: {
					tabId: tab.id
				},
				function: function () {
					window.SessionData = {};
				}
			}, function (response) {
				resolve(response[0].result);
			});
		});
	}

	async function removeData(key, index) {
		const [tab] = await chrome.tabs.query({
			active: true,
			currentWindow: true
		});
		var p = new Promise(function (resolve, reject) {
			chrome.scripting.executeScript({
				target: {
					tabId: tab.id
				},
				function: function () {
					window.SessionData = window.SessionData
					return window.SessionData.recordings.splice(index, 1);
				}
			}, function (response) {
				resolve(response[0]?.result);
			});
		});
		var data = await p;
		return data;
	}

	return {
		get,
		set,
		clear,
		removeData
	};
})();

chrome.runtime.onMessage.addListener(async (message) => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		if (message.action === 'startRecording' && message.body.currentTab.id === tabs[0].id) {
			startRecording(tabs[0].id);
		} else if (message.action === 'stopRecording' && message.body.currentTab.id === tabs[0].id) {
			stopRecording();
		}
	});
});

async function stopRecording() {
	chrome.runtim.sendMessage({ type: "STOP_RECORD" })
}
// var port = chrome.runtime.connect({name: "knock!!!"});
// port.onMessage.addListener((msg) => {
// 	console.log('status1:', msg.status);
// 	console.log('status2:', msg.response);
// });

async function startCapture() {
	// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	// 	chrome.tabs.sendMessage(tabs[0].id, {name: 'initiateRecording'}, async(res) => {
	// 		console.log('resss: ', res);
	// 	});
	// })
	chrome.runtime.sendMessage({ type: "INIT_RECORD" });
}
async function stopCapture() {
	console.log("clicked stop capture button");
	chrome.runtime.sendMessage({ type: 'STOP_RECORD' });
}

document.getElementById('startRecordingButton').addEventListener('click', ()=> {startCapture()});
document.getElementById('stopRecordingButton').addEventListener('click', () => {stopCapture()});
