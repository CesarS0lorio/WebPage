function initializeSlidersPage() {
    const enableSwitch = document.getElementById('enable-slider-switch');
    const mainSlider = document.getElementById('main-slider');
    const sliderValueDisplay = document.getElementById('slider-value');

    if (!enableSwitch || !mainSlider || !sliderValueDisplay) {
        console.error("Error: Uno o más componentes del slider no se encontraron en el DOM.");
        return;
    }

    enableSwitch.addEventListener('change', () => {
        if (enableSwitch.checked) {
            mainSlider.disabled = false;
        } else {
            mainSlider.disabled = true;
        }
    });

    mainSlider.addEventListener('input', () => {
        sliderValueDisplay.textContent = mainSlider.value;
    });

    console.log("Funcionalidad de la página de Sliders inicializada correctamente.");
}