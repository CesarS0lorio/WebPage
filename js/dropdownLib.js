// js/dropdownLib.js

// Data for testing levels and their explanations
// In a real application, this might come from an API or a more extensive data structure
const testingLevelsData = {
    "unit-testing": {
        name: "Unit Testing",
        explanation: "Unit Testing involves testing individual components or modules of a software application to ensure each part functions correctly in isolation. It is typically performed by developers."
    },
    "integration-testing": {
        name: "Integration Testing",
        explanation: "Integration Testing focuses on verifying the interaction between different software modules or components when they are integrated. It aims to detect defects in the interfaces and interactions between integrated components."
    },
    "system-testing": {
        name: "System Testing",
        explanation: "System Testing is a level of software testing where a complete and integrated software is tested. The purpose of this test is to evaluate the system's compliance with the specified requirements."
    },
    "acceptance-testing": {
        name: "Acceptance Testing",
        explanation: "Acceptance Testing, or User Acceptance Testing (UAT), is a phase of software testing in which the software is tested in the 'real world' by the intended audience or business representative. This determines if the system satisfies customer needs and business requirements."
    },
    "performance-testing": {
        name: "Performance Testing",
        explanation: "Performance Testing is a non-functional testing type that evaluates the responsiveness, stability, scalability, and speed of a system under a particular workload. It helps identify and eliminate performance bottlenecks."
    },
    "security-testing": {
        name: "Security Testing",
        explanation: "Security Testing is a type of software testing that intends to uncover vulnerabilities of the system and determine that its data and resources are protected from possible intruders. It ensures that the software system and application are free from any threats or risks."
    }
    // Add more levels as needed
};

// Order of testing levels to display in the dropdown
const testingLevelsOrder = [
    "unit-testing",
    "integration-testing",
    "system-testing",
    "acceptance-testing",
    "performance-testing",
    "security-testing"
];

function initializeDropDownPage() {
    console.log("Attempting to initialize DropDown functionality...");

    const dropdown = document.getElementById('testing-levels-dropdown');
    const viewBtn = document.getElementById('viewLevelBtn');
    const explanationContainer = document.getElementById('level-explanation-container');

    if (!dropdown || !viewBtn || !explanationContainer) {
        console.error("DropDown page elements not found during initialization.");
        return;
    }

    // 1. Populate Dropdown
    dropdown.innerHTML = ''; // Clear existing options
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "-- Select a Level --";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    dropdown.appendChild(defaultOption);

    testingLevelsOrder.forEach(levelKey => {
        if (testingLevelsData[levelKey]) {
            const option = document.createElement('option');
            option.value = levelKey;
            option.textContent = testingLevelsData[levelKey].name;
            dropdown.appendChild(option);
        }
    });

    // 2. Event Listener for View Button
    viewBtn.addEventListener('click', function() {
        const selectedLevelKey = dropdown.value;
        explanationContainer.innerHTML = ''; // Clear previous explanation

        if (selectedLevelKey && testingLevelsData[selectedLevelKey]) {
            const levelData = testingLevelsData[selectedLevelKey];

            const table = document.createElement('table');
            table.className = 'table table-bordered'; // Optional: for styling
            table.style.width = '100%';
            table.style.marginTop = '10px';
            table.style.borderCollapse = 'collapse';


            const headerRow = table.insertRow();
            const th = document.createElement('th');
            th.textContent = 'Aspect';
            th.style.border = '1px solid #ddd';
            th.style.padding = '8px';
            th.style.backgroundColor = '#f2f2f2';
            headerRow.appendChild(th);

            const th2 = document.createElement('th');
            th2.textContent = 'Details';
            th2.style.border = '1px solid #ddd';
            th2.style.padding = '8px';
            th2.style.backgroundColor = '#f2f2f2';
            headerRow.appendChild(th2);


            const nameRow = table.insertRow();
            const nameCellLabel = nameRow.insertCell();
            nameCellLabel.textContent = 'Level Name';
            nameCellLabel.style.fontWeight = 'bold';
            nameCellLabel.style.border = '1px solid #ddd';
            nameCellLabel.style.padding = '8px';
            const nameCellValue = nameRow.insertCell();
            nameCellValue.textContent = levelData.name;
            nameCellValue.style.border = '1px solid #ddd';
            nameCellValue.style.padding = '8px';

            const explanationRow = table.insertRow();
            const explanationCellLabel = explanationRow.insertCell();
            explanationCellLabel.textContent = 'Explanation';
            explanationCellLabel.style.fontWeight = 'bold';
            explanationCellLabel.style.border = '1px solid #ddd';
            explanationCellLabel.style.padding = '8px';

            const explanationCellValue = explanationRow.insertCell();
            explanationCellValue.textContent = levelData.explanation;
            explanationCellValue.style.border = '1px solid #ddd';
            explanationCellValue.style.padding = '8px';

            explanationContainer.appendChild(table);
            console.log(`Displaying explanation for: ${levelData.name}`);
        } else if (selectedLevelKey === "") {
            explanationContainer.innerHTML = '<p style="color: orange;">Please select a testing level first.</p>';
        } else {
            explanationContainer.innerHTML = '<p style="color: red;">Explanation not found for the selected level.</p>';
            console.warn(`No data found for level key: ${selectedLevelKey}`);
        }
    });

    console.log("DropDown functionality setup complete.");
}

// Note: The call to initializeDropDownPage() will be made from uiInteractions.js
// when the 'DropDown' content is loaded.