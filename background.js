chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received in background script: ", message);

    sendResponse({response: "Message received successfully!"});
});

function handleButtonClick() {
    console.log("Button clicked in background script!!!!!");
}

chrome.action.onClicked.addListener(handleButtonClick);