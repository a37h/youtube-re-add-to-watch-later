// Made by x.com/quasa0 on August 3, 2024 using Claude Sonnet 3.5 

console.log("Meow")

async function clickElement(xpath) {
    return new Promise((resolve, reject) => {
        var element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if (element) {
            element.click();
            console.log("Clicked element: " + xpath);
            resolve();
        } else {
            console.log("Element not found: " + xpath);
            reject("Element not found");
        }
    });
}

function isCheckboxChecked(xpath) {
    var element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (element) {
        let isChecked = element.hasAttribute('checked') ||
            element.getAttribute('aria-checked') === 'true' ||
            element.classList.contains('checked');

        if (!isChecked) {
            let parentCheckbox = element.closest('tp-yt-paper-checkbox');
            if (parentCheckbox) {
                isChecked = parentCheckbox.hasAttribute('checked') ||
                    parentCheckbox.getAttribute('aria-checked') === 'true' ||
                    parentCheckbox.classList.contains('checked');
            }
        }

        console.log("Checkbox is " + (isChecked ? "checked" : "unchecked"));
        return isChecked;
    } else {
        console.log("Checkbox element not found");
        return null;
    }
}

async function performActions() {
    const menuButtonXPath = "/html/body/ytd-app/div[1]/ytd-page-manager/ytd-watch-flexy/div[5]/div[1]/div/div[2]/ytd-watch-metadata/div/div[2]/div[2]/div/div/ytd-menu-renderer/yt-button-shape/button/yt-touch-feedback-shape/div/div[2]";
    const saveToPlaylistXPath = "/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/ytd-menu-popup-renderer/tp-yt-paper-listbox/ytd-menu-service-item-renderer[2]/tp-yt-paper-item/yt-formatted-string";
    const checkboxXPath = "/html/body/ytd-app/ytd-popup-container/tp-yt-paper-dialog/ytd-add-to-playlist-renderer/div[2]/ytd-playlist-add-to-option-renderer[1]/tp-yt-paper-checkbox/div[2]";
    const closeButtonXPath = "/html/body/ytd-app/ytd-popup-container/tp-yt-paper-dialog/ytd-add-to-playlist-renderer/div[1]/yt-icon-button/button/yt-icon/span/div";

    try {
        // First two clicks
        await clickElement(menuButtonXPath);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await clickElement(saveToPlaylistXPath);
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Check if checkbox is ticked
        let isChecked = isCheckboxChecked(checkboxXPath);
        if (!isChecked) {
            // If not ticked, tick it and stop execution
            await clickElement(checkboxXPath);
            console.log("Checkbox was not ticked. Ticked it and stopping execution.");
            await clickElement(closeButtonXPath);
            return;
        }

        // If it was ticked, continue with the original flow
        await clickElement(checkboxXPath);
        console.log("Unticked the checkbox");

        // Close the dialog
        await clickElement(closeButtonXPath);
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Repeat first two clicks
        await clickElement(menuButtonXPath);
        await new Promise(resolve => setTimeout(resolve, 1000));
        await clickElement(saveToPlaylistXPath);
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Tick the checkbox
        await clickElement(checkboxXPath);
        console.log("Ticked the checkbox");

        // Close the dialog for the last time
        await clickElement(closeButtonXPath);
        console.log("Closed the dialog for the last time");

        console.log("All actions completed successfully");
    } catch (error) {
        console.error("Error occurred:", error);
    }
}

performActions();
