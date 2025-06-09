// js/menuLib.js

const menuContentData = {
    qaToolsMenu: {
        title: "Benefits of QA Tools",
        text: "QA tools are crucial for ensuring software quality. They facilitate early bug detection, improve testing process efficiency, reduce long-term costs by preventing production failures, and increase confidence in the final product. They allow automation of repetitive tasks, management of test cases, effective defect reporting, and detailed tracking of testing progress, resulting in more robust and reliable software."
    },
    seleniumMenu: {
        title: "Selenium",
        text: "Selenium is a widely used open-source framework for automating web application testing. It supports multiple programming languages like Java, Python, C#, Ruby, and JavaScript. It allows testers to write scripts that interact with web browsers in the same way a user would, validating functionalities and behaviors. It is compatible with most modern browsers."
    },
    appiumMenu: {
        title: "Appium",
        text: "Appium is an open-source test automation tool for native, hybrid, and mobile web applications on iOS, Android, and Windows platforms. It uses the WebDriver protocol, allowing tests to be written in various programming languages. Appium interacts with applications in the same way a user does, without needing to modify the application's code."
    },
    playwrightMenu: {
        title: "Playwright",
        text: "Playwright is an open-source automation framework developed by Microsoft for end-to-end testing. It enables automation of Chromium, Firefox, and WebKit browsers with a single API. It is known for its speed, reliability, and capabilities such as auto-waits, network interception, and the ability to emulate mobile devices and permissions."
    },
    loadrunnerMenu: {
        title: "LoadRunner",
        text: "LoadRunner, now part of Micro Focus, is an industry-leading performance testing tool. It allows simulating thousands of concurrent users to measure the behavior and response of applications under load. It offers a wide range of protocols and technologies, and provides detailed analysis to identify bottlenecks and optimize performance."
    },
    jmeterMenu: {
        title: "JMeter",
        text: "Apache JMeter is an open-source, Java-based tool designed for load and performance testing, as well as functional testing. Originally developed for testing web applications, it has expanded to support other protocols. It is highly extensible and allows simulating heavy loads on servers, networks, or objects to analyze their performance under different conditions."
    },
    neoloadMenu: {
        title: "NeoLoad",
        text: "NeoLoad, by Neotys (now part of Tricentis), is a performance testing platform designed for web and mobile applications. It focuses on agility and automation, allowing for rapid design, execution, and analysis of load tests. It offers integration with CI/CD tools and a code-less approach to test script creation."
    },
    k6Menu: {
        title: "K6",
        text: "K6, by Grafana Labs, is a modern open-source load testing tool for developers and test engineers. Scripts are written in JavaScript (ES2015/ES6) and it focuses on being easy to use, flexible, and powerful. K6 is designed to integrate well into development workflows and is ideal for continuous performance testing."
    }
};

function showMenuContent(menuKey) {
    const displayArea = document.getElementById('menuInfoDisplay');
    const titleElement = document.getElementById('menuContentTitle');
    const textElement = document.getElementById('menuContentText');

    if (!displayArea || !titleElement || !textElement) {
        console.error("Menu content display elements not found!");
        return;
    }

    if (menuContentData[menuKey]) {
        titleElement.textContent = menuContentData[menuKey].title;
        textElement.textContent = menuContentData[menuKey].text;
        displayArea.style.display = 'block';
    } else {
        console.warn(`No content defined for menu key: ${menuKey}`);
        displayArea.style.display = 'none';
    }
}

function initializeMenuPage() {
    console.log("Initializing Menu Page...");
    const menuLinks = document.querySelectorAll('#menu-container .top-nav-menu a[data-menu-key]');

    if(menuLinks.length === 0) {
        console.warn("No menu links with 'data-menu-key' found within #menu-container.");
        return;
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const menuKey = this.getAttribute('data-menu-key');
            if (menuKey) {
                showMenuContent(menuKey);
            } else {
                console.error("Clicked menu link is missing 'data-menu-key' attribute:", this);
            }
        });
    });
    console.log("Menu Page event listeners attached.");
}

// The call to initializeMenuPage will be done from uiInteractions.js
// when Menu.html is loaded.