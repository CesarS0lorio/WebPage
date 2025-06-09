// js/checkBoxLib.js

function inicializarEstadoCheckBoxes() {
  const ninjaCheck = document.getElementById('ninjaCheck');
  const automationCheck = document.getElementById('automationCheck');
  const performanceCheck = document.getElementById('performanceCheck');
  const functionalCheck = document.getElementById('functionalCheck');

  const ninjaSummaryP = document.getElementById('ninjaSummary');
  const automationSummaryP = document.getElementById('automationSummary');
  const performanceSummaryP = document.getElementById('performanceSummary');
  const functionalSummaryP = document.getElementById('functionalSummary');

  if (!ninjaCheck || !automationCheck || !performanceCheck || !functionalCheck ||
    !ninjaSummaryP || !automationSummaryP || !performanceSummaryP || !functionalSummaryP) {
    console.error("Error: Not all required elements for checkboxes and their summaries were found. Did CheckBox.html load correctly and does it have all the IDs?");
    return;
  }

  function updateSummaryText(checkbox, paragraphElement, optionName) {
    const isEnabled = !checkbox.disabled;
    const isSelected = checkbox.checked;

    const statusText = isEnabled ? "Enabled" : "Disabled";
    const selectedText = isSelected ? "Checked" : "Unchecked";

    paragraphElement.textContent = `${optionName} is ${statusText} and ${selectedText}.`;

    //styles
    if (!isEnabled) {
      paragraphElement.style.textDecoration = 'line-through';
    } else {
      paragraphElement.style.textDecoration = 'none';
    }
    //styles
    if (isSelected) {
      paragraphElement.className = 'selected-text-blue';
    } else {
      paragraphElement.className = 'selected-text-gray';
    }
  }

  // reload info
  updateSummaryText(ninjaCheck, ninjaSummaryP, 'Ninja');
  updateSummaryText(automationCheck, automationSummaryP, 'Automation');
  updateSummaryText(performanceCheck, performanceSummaryP, 'Performance');
  updateSummaryText(functionalCheck, functionalSummaryP, 'Functional');

  automationCheck.addEventListener('change', function() {
    updateSummaryText(this, automationSummaryP, 'Automation');
  });
  performanceCheck.addEventListener('change', function() {
    updateSummaryText(this, performanceSummaryP, 'Performance');
  });
}
