let timer = 0;

async function startRecording() {
    await chrome.tabs.query({
        'active': true,
        'lastFocusedWindow': true,
        'currentWindow': true
    }, async function (tabs) {
        const currentTab = tabs[0];

        let counter = 0;
        timer = setInterval(() => {
            counter += 1;
            console.log('timecounter:', counter);
        }, 1000);
        
        await chrome.runtime.sendMessage({
            action: 'startRecording',
            body: {
                currentTab: currentTab
            }
        });
    });
}

async function stopRecording() {
    await chrome.tabs.query({
        'active': true,
        'lastFocusedWindow': true,
        'currentWindow': true
    }, async function (tabs) {
        clearInterval(timer);
        const currentTab = tabs[0];
        
        await chrome.runtime.sendMessage({
            action: 'stopRecording',
            body: {
                currentTab: currentTab
            }
        });
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.name === 'initiateRecording') {
        startRecording();
    } else if (request.name === 'stopRecording') {
        stopRecording();
    }
});