function toggleSubmenu(element) {
    const submenu = element.nextElementSibling;
    if (!submenu) {
        console.error("Submenu not found for element:", element);
        return;
    }

    const isSubmenuOpen = submenu.style.display === "block";

    document.querySelectorAll('.sidebar-section ul ul').forEach(sm => {
        if (sm !== submenu) {
            sm.style.display = 'none';
        }
    });

    if (isSubmenuOpen) {
        submenu.style.display = "none";
    } else {
        submenu.style.display = "block";
    }
}

async function loadContent(contentName) {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) {
        console.error("Fatal Error: Content area element with ID 'content-area' not found in the DOM.");
        return;
    }

    try {
        const response = await fetch(`content/${contentName}.html`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}, while trying to fetch content/${contentName}.html`);
        }
        const html = await response.text();
        contentArea.innerHTML = html;

        if (contentName === 'TextBox') {
            if (typeof textBoxLib !== 'undefined' && typeof textBoxLib.validateName === 'function') {
                const nameInput = document.getElementById('name');
                const emailInput = document.getElementById('email');
                const descriptionInput = document.getElementById('description');
                if (nameInput) nameInput.addEventListener('input', () => textBoxLib.validateName(true));
                if (emailInput) emailInput.addEventListener('input', () => textBoxLib.validateEmail(true));
                if (descriptionInput) descriptionInput.addEventListener('input', () => textBoxLib.validateDescription(true));
                console.log('TextBox event listeners attached and functionality initialized.');
            } else {
                console.warn("textBoxLib or its functions are not defined. Ensure textBoxLogic.js is loaded and correct for 'TextBox' content.");
            }
        } else if (contentName === 'CheckBox') {
            if (typeof inicializarEstadoCheckBoxes === 'function') {
                inicializarEstadoCheckBoxes();
                console.log('CheckBox status initialized.');
            } else {
                console.warn("inicializarEstadoCheckBoxes is not defined. Ensure checkBoxLib.js is loaded for 'CheckBox' content.");
            }
        } else if (contentName === 'RadioButton') {
            if (typeof initializeRadioButtons === 'function') {
                initializeRadioButtons();
                console.log('RadioButton functionality initialized.');
            } else {
                console.warn("initializeRadioButtons is not defined. Ensure radioButtonLib.js is loaded for 'RadioButton' content.");
            }
        } else if (contentName === 'Buttons') {
            if (typeof initializeButtonsFunctionality === 'function') {
                initializeButtonsFunctionality();
                console.log('Buttons functionality initialized.');
            } else {
                console.warn("initializeButtonsFunctionality is not defined. Ensure buttonsLib.js is loaded for 'Buttons' content.");
            }
        } else if (contentName === 'DropDown') {
            if (typeof initializeDropDownPage === 'function') {
                initializeDropDownPage();
                console.log('DropDown functionality initialized.');
            } else {
                console.warn("initializeDropDownPage is not defined. Ensure dropdownLib.js is loaded for 'DropDown' content.");
            }
        } else if (contentName === 'Accordion') {
            if (typeof initializeAccordionFunctionality === 'function') {
                initializeAccordionFunctionality();
                console.log('Accordion functionality initialized.');
            } else {
                console.warn("initializeAccordionFunctionality is not defined. Ensure accordionLib.js is loaded and the function exists when 'Accordion' content is loaded.");
            }
        } else if (contentName === 'DatePicker') {
            if (typeof initializeDatePicker === 'function') {
                initializeDatePicker();
                console.log('DatePicker functionality initialized.');
            } else {
                console.warn("initializeDatePicker is not defined. Ensure datePickerLib.js is loaded and the function exists when 'DatePicker' content is loaded.");
            }
        } else if (contentName === 'Tabs') {
            if (typeof initializeBddTabs === 'function') {
                initializeBddTabs();
                console.log('BDD Tabs functionality initialized.');
            } else {
                console.warn("initializeBddTabs is not defined. Ensure tabsLib.js is loaded and the function exists when 'Tabs' content is loaded.");
            }
        } else if (contentName === 'Alerts') {
            if (typeof initializeAlertsPage === 'function') {
                initializeAlertsPage();
                console.log('Alerts page functionality initialized.');
            } else {
                console.warn("initializeAlertsPage is not defined. Ensure alertsLib.js is loaded and the function exists when 'Alerts' content is loaded.");
            }
        } else if (contentName === 'Windows') {
            if (typeof initializeWindowsPage === 'function') {
                initializeWindowsPage();
                console.log('Windows page functionality initialized.');
            } else {
                console.warn("initializeWindowsPage is not defined. Ensure windowsLib.js is loaded and the function exists when 'Windows' content is loaded.");
            }
        } else if (contentName === 'Sliders') {
            if (typeof initializeSlidersPage === 'function') {
                initializeSlidersPage();
                console.log('Sliders page functionality initialized.');
            } else {
                console.warn("initializeSlidersPage is not defined. Ensure slidersLib.js is loaded and the function exists when 'Sliders' content is loaded.");
            }
        } else if (contentName === 'Menu') {
        if (typeof initializeMenuPage === 'function') {
            initializeMenuPage();
            console.log('Menu page functionality initialized.');
        } else {
            console.warn("initializeMenuPage is not defined. Ensure menuLib.js is loaded and the function exists when 'Menu' content is loaded.");
        }
    } else if (contentName === 'Menu') {
        if (typeof initializeMenuPage === 'function') {
            initializeMenuPage();
        } else {
            console.warn("initializeMenuPage is not defined...");
        }
    } else if (contentName === 'Api') {
        if (typeof initializeApiPage === 'function') {
            initializeApiPage();
        } else {
            console.warn("initializeApiPage is not defined. Ensure apiLib.js is loaded and the function exists when 'Api' content is loaded.");
        }
    }

        console.log(`Content for '${contentName}' loaded and initialized successfully.`);

    } catch (error) {
        console.error(`Could not load or initialize content for '${contentName}':`, error);
        contentArea.innerHTML = `<h2>Error Loading Content</h2><p>Sorry, the content for '${contentName}' could not be loaded. Please check the console for more details. Error: ${error.message}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const contentLinks = document.querySelectorAll('.sidebar-section a[data-content]');

    if (contentLinks.length === 0) {
        console.warn("No sidebar links with 'data-content' attribute found. Navigation might not work.");
    }

    contentLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const contentToLoad = this.getAttribute('data-content');
            if (contentToLoad) {
                loadContent(contentToLoad);
            } else {
                console.error("Clicked link is missing 'data-content' attribute:", this);
            }
        });
    });
    console.log("UI Interactions script initialized. Sidebar links are now active.");
});