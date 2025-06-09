// js/windowsLib.js

function initializeWindowsPage() {
    console.log("Initializing Windows Page...");

    const openPopUpButton = document.getElementById('openPopUpBtn');
    const openNewTabButton = document.getElementById('openNewTabBtn');
    const openNewWindowButton = document.getElementById('openNewWindowBtn');
    const messageArea = document.getElementById('windows-action-message');

    if (!openPopUpButton || !openNewTabButton || !openNewWindowButton || !messageArea) {
        console.error("One or more elements for Windows page were not found. Aborting initialization.");
        return;
    }

    const newWindowContent = (title, message) => `
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <style>
                body {
                    background-color: #4A4A4A; /* Dark Grey */
                    color: white;
                    font-family: Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                    padding: 20px;
                    box-sizing: border-box;
                    text-align: center;
                }
                h1 {
                    font-size: 1.5em;
                }
            </style>
        </head>
        <body>
            <h1>${message}</h1>
        </body>
        </html>
    `;

    openPopUpButton.addEventListener('click', () => {
        const popupWidth = 400;
        const popupHeight = 200;
        const left = (screen.width / 2) - (popupWidth / 2);
        const top = (screen.height / 2) - (popupHeight / 2);
        // Features for a more restricted pop-up
        const popupFeatures = `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=yes,scrollbars=no,status=no,toolbar=no,menubar=no,location=no`;

        // Use a unique name for each popup to ensure it's new, or a generic name if you want to reuse/replace.
        const popupWindow = window.open('', 'CustomPopUp_' + Date.now(), popupFeatures);
        if (popupWindow) {
            popupWindow.document.write(newWindowContent('Pop-Up', 'Hi! this is a Pop- up'));
            popupWindow.document.close();
            popupWindow.focus();
            messageArea.textContent = "PopUp opened. You might need to allow pop-ups for this site.";
            messageArea.style.color = "green";
        } else {
            messageArea.textContent = "Pop-up blocked. Please allow pop-ups for this site.";
            messageArea.style.color = "red";
        }
    });

    openNewTabButton.addEventListener('click', () => {
        const newTab = window.open('', '_blank');
        if (newTab) {
            newTab.document.write(newWindowContent('New Tab', 'Hi! This is loaded into a new Tab'));
            newTab.document.close();
            try { newTab.focus(); } catch (e) { console.warn("Could not focus new tab", e); }
            messageArea.textContent = "New tab should have opened.";
            messageArea.style.color = "green";
        } else {
            messageArea.textContent = "Could not open new tab. Please check browser settings.";
            messageArea.style.color = "red";
        }
    });

    openNewWindowButton.addEventListener('click', () => {
        const windowWidth = 800;
        const windowHeight = 600;
        const left = (screen.width / 2) - (windowWidth / 2) + 50;
        const top = (screen.height / 2) - (windowHeight / 2) + 50;

        const newWindowFeatures = `width=${windowWidth},height=${windowHeight},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes,toolbar=yes,menubar=yes,location=yes`;

        const newWindow = window.open('', 'NewBrowserWindow_' + Date.now(), newWindowFeatures);
        if (newWindow) {
            newWindow.document.write(newWindowContent('New Window', 'Hello! this is a new Window'));
            newWindow.document.close();
            newWindow.focus();
            messageArea.textContent = "New window should have opened.";
            messageArea.style.color = "green";
        } else {
            messageArea.textContent = "Could not open new window. Please check browser settings (pop-up blocker?).";
            messageArea.style.color = "red";
        }
    });

    console.log("Windows Page functionality initialized.");
}
