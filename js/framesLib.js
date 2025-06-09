// js/framesLib.js

function initializeFramesPage() {
    console.log("Initializing Frames Page...");

    const mainFrame = document.getElementById('mainFrame');
    // const nestedFrame = mainFrame.contentWindow.document.getElementById('nestedFrame'); // Acceder al nested frame es más complejo así.

    if (!mainFrame) {
        console.error("Main frame element not found. Aborting initialization of specific frame interactions.");
        return;
    }

    // Ejemplo: Puedes añadir listeners o manipular los iframes aquí si es necesario.
    // Por ahora, la carga es manejada por srcdoc.

    // Para ilustrar cómo podrías interactuar con el contenido del iframe DESPUÉS de que cargue,
    // (aunque con srcdoc es síncrono, con src es asíncrono y necesitarías un onload)
    mainFrame.addEventListener('load', () => {
        console.log("Main frame loaded its srcdoc content.");
        try {
            const mainFrameDocument = mainFrame.contentDocument || mainFrame.contentWindow.document;
            if (mainFrameDocument) {
                const nestedFrameElement = mainFrameDocument.getElementById('nestedFrame');
                if (nestedFrameElement) {
                    console.log("Nested frame element found inside main frame's document.");
                    // Puedes añadir un listener de carga al nested frame también si es necesario
                    nestedFrameElement.addEventListener('load', () => {
                        console.log("Nested frame loaded its srcdoc content.");
                    });
                }
            }
        } catch (e) {
            console.error("Error accessing main frame content (possibly due to cross-origin restrictions if src was used):", e);
        }
    });


    console.log("Frames Page functionality initialized.");
}
