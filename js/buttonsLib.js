// js/buttonsLib.js

function initializeButtonsFunctionality() {
    console.log("Attempting to initialize buttons functionality...");

    // Get button elements
    const doubleClickBtn = document.getElementById('doubleClickBtn');
    const clickBtn = document.getElementById('clickBtn'); // <-- El botón que modificaremos
    const rightClickBtn = document.getElementById('rightClickBtn');
    const clearBtn = document.getElementById('clearBtn');

    // Get message span elements
    const doubleClickMsg = document.getElementById('doubleClickMsg');
    const dynamicClickMsg = document.getElementById('dynamicClickMsg'); // <-- El mensaje que controlaremos
    const rightClickMsg = document.getElementById('rightClickMsg');

    // --- Event Listeners ---

    // 1. Double Click Button (sin cambios)
    if (doubleClickBtn && doubleClickMsg) {
        doubleClickBtn.addEventListener('dblclick', function() {
            doubleClickMsg.textContent = 'You have done a double click';
            console.log('Double click event on #doubleClickBtn');
        });
    } else {
        console.error('Double click button or message area not found during initialization.');
    }

    // 2. Click Button (Dynamic Click) - MODIFICADO
    if (clickBtn && dynamicClickMsg) {
        let clickTimer = null; // Variable para almacenar el ID del temporizador
        const DBL_CLICK_THRESHOLD = 250; // Tiempo en ms para considerar un doble clic (ajusta según sea necesario)

        clickBtn.addEventListener('click', function() {
            // Cada vez que hay un 'click', limpiamos cualquier temporizador anterior.
            // Esto maneja el caso donde un 'click' ocurre, luego otro 'click'
            // (que formará parte de un 'dblclick') ocurre antes de que el temporizador del primer 'click' expire.
            if (clickTimer) {
                clearTimeout(clickTimer);
                clickTimer = null;
            }

            // Configuramos un nuevo temporizador. Si este temporizador se completa,
            // significa que no hubo un 'dblclick' lo suficientemente rápido.
            clickTimer = setTimeout(function() {
                dynamicClickMsg.textContent = 'You have done a dynamic click';
                console.log('Single click event on #clickBtn (timer expired)');
                clickTimer = null; // Reseteamos el ID del temporizador
            }, DBL_CLICK_THRESHOLD);
        });

        clickBtn.addEventListener('dblclick', function() {
            // Si ocurre un 'dblclick', significa que los 'click' anteriores
            // no deben interpretarse como un clic simple.
            if (clickTimer) {
                clearTimeout(clickTimer); // Cancelamos el temporizador del clic simple
                clickTimer = null;
            }
            dynamicClickMsg.textContent = ''; // Nos aseguramos de que no haya mensaje en un doble clic
            console.log('Double click event on #clickBtn, single click message prevented.');
        });

    } else {
        console.error('Click button or message area not found during initialization.');
    }

    // 3. Right Click Button (sin cambios)
    if (rightClickBtn && rightClickMsg) {
        rightClickBtn.addEventListener('contextmenu', function(event) {
            event.preventDefault();
            rightClickMsg.textContent = 'You have done a right click';
            console.log('Contextmenu event on #rightClickBtn');
        });
    } else {
        console.error('Right click button or message area not found during initialization.');
    }

    // 4. Disabled button has its message set in HTML directly.

    // 5. Clear Button (sin cambios)
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (doubleClickMsg) doubleClickMsg.textContent = '';
            if (dynamicClickMsg) dynamicClickMsg.textContent = '';
            if (rightClickMsg) rightClickMsg.textContent = '';
            console.log('Click event on #clearBtn - messages cleared');
        });
    } else {
        console.error('Clear button not found during initialization.');
    }

    console.log("buttonsLib.js functionality setup complete (or attempted).");
}

// Asegúrate de que esta función initializeButtonsFunctionality() sea llamada
// después de que el contenido de Buttons.html se cargue, como se discutió en la solución anterior.
// Por ejemplo, desde uiInteractions.js:
//
// else if (contentName === 'Buttons') {
//     if (typeof initializeButtonsFunctionality === 'function') {
//         initializeButtonsFunctionality();
//         console.log('Buttons functionality initialized.');
//     } else {
//         console.error("initializeButtonsFunctionality is not defined...");
//     }
// }