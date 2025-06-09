// js/accordionLib.js

/**
 * Initializes the accordion functionality.
 * Makes accordion items expandable and collapsible, ensuring only one item is open at a time.
 */
function initializeAccordionFunctionality() {
    // Get all elements with the class 'accordion-item'
    const accordionItems = document.querySelectorAll('.accordion-item');

    if (accordionItems.length === 0) {
        console.warn("No accordion items found. Ensure your HTML has elements with class 'accordion-item'.");
        return;
    }

    accordionItems.forEach(item => {
        // For each item, get its header and content panel
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');

        // Check if both header and content exist for the item
        if (header && content) {
            header.addEventListener('click', () => {
                // Determine if the current item is already open
                const isCurrentlyOpen = header.classList.contains('active');

                // First, close all other accordion items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) { // Don't close the item we might be trying to open
                        const otherHeader = otherItem.querySelector('.accordion-header');
                        const otherContent = otherItem.querySelector('.accordion-content');
                        if (otherHeader && otherContent && otherHeader.classList.contains('active')) {
                            otherContent.style.maxHeight = null;
                            otherContent.style.paddingTop = null;
                            otherContent.style.paddingBottom = null;
                            otherHeader.classList.remove('active');
                        }
                    }
                });

                // Then, toggle the current item
                if (isCurrentlyOpen) {
                    // If it was open, close it
                    content.style.maxHeight = null;
                    content.style.paddingTop = null;
                    content.style.paddingBottom = null;
                    header.classList.remove('active');
                } else {
                    // If it was closed, open it
                    // Set padding before maxHeight for a smoother visual transition if content appears suddenly
                    content.style.paddingTop = '15px';
                    content.style.paddingBottom = '15px';
                    // Set maxHeight to the scrollHeight to expand it
                    content.style.maxHeight = content.scrollHeight + "px";
                    header.classList.add('active');
                }
            });
        } else {
            // Log a warning if an accordion item is missing its header or content
            console.warn("Accordion item is missing a header (.accordion-header) or content (.accordion-content):", item);
        }
    });
    console.log("Accordion functionality initialized from accordionLib.js");
}

// This function should be called when the 'accordion' content is loaded.
// Your uiInteractions.js file will handle calling this at the appropriate time.
