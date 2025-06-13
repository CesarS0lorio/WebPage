// js/radioButtonLib.js

function initializeRadioButtons() { // Changed function name to English as well
    const petNameInput = document.getElementById('petNameInput');
    const viewPetInfoButton = document.getElementById('viewBtn');
    const petInfoOutput = document.getElementById('petInfoOutput');
    const ageRangeRadios = document.querySelectorAll('input[name="ageRange"]');

    if (!petNameInput || !viewPetInfoButton || !petInfoOutput || ageRangeRadios.length === 0) {
        console.error("Error: Not all necessary elements for RadioButton functionality were found. Was RadioButton.html loaded correctly?");
        if (petInfoOutput) {
            petInfoOutput.textContent = "Error initializing. Missing elements.";
            petInfoOutput.style.color = "red";
        }
        return;
    }

    viewPetInfoButton.addEventListener('click', function() {
        const petName = petNameInput.value.trim();
        let selectedAgeRange = null;

        ageRangeRadios.forEach(radio => {
            if (radio.checked) {
                selectedAgeRange = radio.value;
            }
        });

        petInfoOutput.style.color = "inherit"; // Reset color

        if (!petName) {
            petInfoOutput.textContent = "Please enter your name.";
            petInfoOutput.style.color = "red";
            return;
        }

        if (!selectedAgeRange) {
            petInfoOutput.textContent = "Please select a range of time from QA Software Experience";
            petInfoOutput.style.color = "red";
            return;
        }

        // This line was already in English, so it remains the same.
        petInfoOutput.textContent = `Hello ${petName} you have selected that you have ${selectedAgeRange} on QA Software Experience.`;
    });

    console.log("RadioButton functionality initialized.");
}
