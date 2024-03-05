console.log("attached content test...");

chrome.runtime.sendMessage({ type: "OPTION_OPENED" });

function audioCapture() {
    return new Promise((resolve) => {
        chrome.tabCapture.capture({ audio: !0, video: !1 }, (stream) => {
            resolve(stream);
        });
    });
}

chrome.runtime.onMessage.addListener(async (request) => {
	if (request.type === "START_RECORD") {
		s = new AudioContext(),
			p = s.createMediaStreamDestination();
		const g = await audioCapture(),
			h = new AudioContext();
		h.createMediaStreamSource(g).connect(h.destination),
			s.createMediaStreamSource(g).connect(p);
		C.startRecording(p.stream),
			chrome.runtime.sendMessage({
				type: "RECORD_STARTED"
			});
	}
	return (
		request.type === "STOP_RECORD" && C.stopRecording(),
		request.type === "PAUSE_RECORD" &&
		C.pauseRecording() &&
		chrome.runtime.sendMessage({
			type: "RECORD_PAUSED"
		}),
		request.type === "RESUME_RECORD" &&
		C.resumeRecording() &&
		chrome.runtime.sendMessage({
			type: "RECORD_RESUMED"
		}),
		!0
	);
});
