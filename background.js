chrome.action.onClicked.addListener((tab) => {
    console.log("Added listener");
    if (tab.url.includes("youtube.com")) {
        try {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ["main.js"]
            });
        } catch (error) {
            console.error("Error executing script:", error);
        }
    }
});