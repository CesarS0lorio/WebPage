// js/alertsLib.js

function initializeAlertsPage() {
    console.log("Initializing Alerts Page with custom modals...");

    // Elements for custom alert modal
    const showAlertButton = document.getElementById('showAlertBtn');
    const customAlertModal = document.getElementById('customAlertModal');
    const customAlertCloseButton = document.getElementById('customAlertCloseBtn');
    const customAlertOkButton = document.getElementById('customAlertOkBtn');
    const customAlertMessageElement = document.getElementById('customAlertMessage');

    // Elements for custom confirm modal
    const showConfirmButton = document.getElementById('showConfirmBtn');
    const customConfirmModal = document.getElementById('customConfirmModal');
    const customConfirmCloseButton = document.getElementById('customConfirmCloseBtn');
    const customConfirmOkButton = document.getElementById('customConfirmOkBtn');
    const customConfirmCancelButton = document.getElementById('customConfirmCancelBtn');
    const customConfirmMessageElement = document.getElementById('customConfirmMessage');
    const alertResultElement = document.getElementById('alert-result');

    // Check if all elements exist
    if (!showAlertButton || !customAlertModal || !customAlertCloseButton || !customAlertOkButton ||
        !showConfirmButton || !customConfirmModal || !customConfirmCloseButton || !customConfirmOkButton ||
        !customConfirmCancelButton || !alertResultElement || !customAlertMessageElement || !customConfirmMessageElement) {
        console.error("One or more elements for custom alerts/confirms were not found. Aborting initialization.");
        return;
    }

    // --- Custom Alert Modal Logic ---
    let alertResolve = null; // <-- CAMBIO: Añadido para manejar la promesa de la alerta

    function openCustomAlert(message) {
        customAlertMessageElement.textContent = message || 'This is an alert.';
        customAlertModal.hidden = false;
        customAlertModal.setAttribute('aria-hidden', 'false');
        customAlertOkButton.focus(); // Focus on OK button

        // <-- CAMBIO: Retornar una promesa que se resuelve cuando el usuario interactúa
        return new Promise((resolve) => {
            alertResolve = resolve;
        });
    }

    function closeCustomAlert(result) { // <-- CAMBIO: Acepta un parámetro 'result'
        customAlertModal.hidden = true;
        customAlertModal.setAttribute('aria-hidden', 'true');
        showAlertButton.focus(); // Return focus to the button that opened the alert

        // <-- CAMBIO: Resuelve la promesa con el resultado y la resetea
        if (alertResolve) {
            alertResolve(result);
            alertResolve = null;
        }
    }

    // <-- CAMBIO: Se convierte la función en async para usar await
    showAlertButton.addEventListener('click', async () => {
        alertResultElement.textContent = ''; // Limpia el resultado anterior
        await openCustomAlert('This is an alert'); // Espera a que la promesa se resuelva

        // Muestra el mensaje de que se presionó OK
        alertResultElement.textContent = 'You selected: OK';
        alertResultElement.style.color = 'green';
    });

    customAlertCloseButton.addEventListener('click', () => closeCustomAlert(false)); // <-- CAMBIO: Pasa 'false' como resultado
    customAlertOkButton.addEventListener('click', () => closeCustomAlert(true));   // <-- CAMBIO: Pasa 'true' como resultado

    // Close modal if escape key is pressed
    customAlertModal.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeCustomAlert(false); // <-- CAMBIO: Considera Escape como 'cancelar'
        }
    });

    // --- Custom Confirm Modal Logic ---
    let confirmResolve = null; // To handle the promise for confirm

    function openCustomConfirm(message) {
        customConfirmMessageElement.textContent = message || 'This an alert to confirm.';
        customConfirmModal.hidden = false;
        customConfirmModal.setAttribute('aria-hidden', 'false');
        customConfirmOkButton.focus(); // Focus on OK button initially

        // Return a promise that resolves with true (OK) or false (Cancel/Close)
        return new Promise((resolve) => {
            confirmResolve = resolve;
        });
    }

    function closeCustomConfirm(result) {
        customConfirmModal.hidden = true;
        customConfirmModal.setAttribute('aria-hidden', 'true');
        showConfirmButton.focus(); // Return focus to the button that opened the confirm
        if (confirmResolve) {
            confirmResolve(result);
            confirmResolve = null; // Reset for next use
        }
    }

    showConfirmButton.addEventListener('click', async () => {
        alertResultElement.textContent = ''; // Clear previous result
        const userConfirmed = await openCustomConfirm('This an alert to confirm.');
        if (userConfirmed) {
            alertResultElement.textContent = 'You selected: OK';
            alertResultElement.style.color = 'green';
        } else {
            alertResultElement.textContent = 'You selected: Cancel';
            alertResultElement.style.color = 'red';
        }
    });

    customConfirmCloseButton.addEventListener('click', () => closeCustomConfirm(false));
    customConfirmOkButton.addEventListener('click', () => closeCustomConfirm(true));
    customConfirmCancelButton.addEventListener('click', () => closeCustomConfirm(false));

    // Close modal if escape key is pressed
    customConfirmModal.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeCustomConfirm(false); // Consider Escape as Cancel
        }
    });

    // Trap focus within modals (basic implementation)
    function trapFocus(modalElement) {
        const focusableElements = modalElement.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        modalElement.addEventListener('keydown', (event) => {
            if (event.key !== 'Tab') {
                return;
            }

            if (event.shiftKey) { // Shift + Tab
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    event.preventDefault();
                }
            } else { // Tab
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    event.preventDefault();
                }
            }
        });
    }

    trapFocus(customAlertModal);
    trapFocus(customConfirmModal);


    console.log("Custom Alerts and Confirms page initialized.");
}