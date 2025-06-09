// js/tabsLib.js

function initializeBddTabs() {
    console.log("Initializing BDD Tabs...");

    const tabContainer = document.querySelector('.tabs-container-bdd');
    if (!tabContainer) {
        console.warn("BDD Tabs container not found. Skipping initialization.");
        return;
    }

    const tabs = tabContainer.querySelectorAll('.tab-bdd');
    const panels = tabContainer.querySelectorAll('.tab-panel-bdd');

    if (tabs.length === 0 || panels.length === 0) {
        console.warn("BDD Tabs or Panels not found. Ensure they have '.tab-bdd' and '.tab-panel-bdd' classes respectively.");
        return;
    }

    // Function to switch tabs
    const switchTab = (newTab) => {
        // Deactivate all tabs and hide all panels
        tabs.forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('aria-selected', 'false');
            tab.setAttribute('tabindex', '-1');
        });
        panels.forEach(panel => {
            panel.classList.remove('active');
            panel.hidden = true;
        });

        // Activate the new tab and show its panel
        newTab.classList.add('active');
        newTab.setAttribute('aria-selected', 'true');
        newTab.setAttribute('tabindex', '0');

        const newPanelId = newTab.getAttribute('aria-controls');
        const newPanel = document.getElementById(newPanelId);
        if (newPanel) {
            newPanel.classList.add('active');
            newPanel.hidden = false;
            newPanel.focus(); // Optional: set focus to the panel for accessibility
        } else {
            console.error(`Panel with ID '${newPanelId}' not found.`);
        }
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            switchTab(e.currentTarget);
        });

        // Keyboard navigation
        tab.addEventListener('keydown', (e) => {
            let currentIndex = Array.from(tabs).indexOf(e.currentTarget);
            let newIndex;

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                newIndex = (currentIndex + 1) % tabs.length;
                e.preventDefault(); // Prevent page scroll
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                e.preventDefault(); // Prevent page scroll
            } else if (e.key === 'Home') {
                newIndex = 0;
                e.preventDefault();
            } else if (e.key === 'End') {
                newIndex = tabs.length - 1;
                e.preventDefault();
            }

            if (newIndex !== undefined) {
                tabs[newIndex].focus(); // Move focus to the new tab button
                // Optionally, uncomment the next line to switch tab on arrow key navigation as well
                // switchTab(tabs[newIndex]);
            }
        });
    });

    // Ensure the first tab is active by default if no other tab is marked active in HTML
    const activeTab = tabContainer.querySelector('.tab-bdd.active');
    if (!activeTab && tabs.length > 0) {
        switchTab(tabs[0]);
    } else if (activeTab) {
        // If an active tab is set in HTML, ensure its panel is visible
        const activePanelId = activeTab.getAttribute('aria-controls');
        const activePanel = document.getElementById(activePanelId);
        if (activePanel) {
            panels.forEach(panel => panel.hidden = true); // Hide all others
            activePanel.hidden = false;
            activePanel.classList.add('active');
        }
    }


    console.log("BDD Tabs initialized successfully.");
}
