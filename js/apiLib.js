// js/apiLib.js

function initializeApiPage() {
    const buttons = document.querySelectorAll('.api-button');
    const responseArea = document.getElementById('response-area');
    const statusCodeEl = document.getElementById('status-code');
    const responseBodyEl = document.getElementById('response-body');
    const loader = document.getElementById('loader');

    if (!buttons.length || !responseArea || !statusCodeEl || !responseBodyEl || !loader) {
        console.error("API page elements not found. Initialization aborted.");
        return;
    }

    buttons.forEach(button => {
        button.addEventListener('click', async () => {
            const url = button.dataset.url;
            const method = button.dataset.method;

            responseArea.classList.remove('visible');
            loader.style.display = 'block';

            try {
                const options = { method: method };
                if (method === 'POST') {
                    options.headers = { 'Content-Type': 'application/json' };
                    options.body = JSON.stringify({
                        title: 'foo',
                        body: 'bar',
                        userId: 1,
                    });
                }

                const response = await fetch(url, options);

                // Update the status
                statusCodeEl.textContent = `${response.status} ${response.statusText}`;
                statusCodeEl.className = ''; // Clear previous classes
                if (response.status >= 500) {
                    statusCodeEl.classList.add('status-server-error');
                } else if (response.status >= 400) {
                    statusCodeEl.classList.add('status-client-error');
                } else if (response.status >= 200 && response.status < 300) {
                    statusCodeEl.classList.add('status-success');
                } else {
                    statusCodeEl.classList.add('status-info');
                }

                // Try to get the response body
                let responseData;
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    responseData = await response.json();
                } else {
                    responseData = await response.text();
                    if (!responseData) {
                        responseData = { message: "The response has no content body (No Content)." };
                    }
                }
                responseBodyEl.textContent = JSON.stringify(responseData, null, 2);

            } catch (error) {
                // Handle network errors
                statusCodeEl.textContent = 'Network Error';
                statusCodeEl.className = 'status-server-error';
                responseBodyEl.textContent = JSON.stringify({
                    error: 'Could not complete the request.',
                    message: error.message
                }, null, 2);
            } finally {
                // Hide the loader and show the response
                loader.style.display = 'none';
                responseArea.classList.add('visible');
            }
        });
    });
    console.log("API page functionality initialized.");
}