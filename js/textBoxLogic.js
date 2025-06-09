// js/textBoxLogic.js
const textBoxLib = {
    validateName: (isTyping = false) => {
        const nameInput = document.getElementById('name');
        if (!nameInput) return false;
        const nameError = document.getElementById('name-error');
        if (!nameError) return false;
        const value = nameInput.value.trim();
        const alphanumericRegex = /^[a-zA-Z0-9]+$/;

        nameInput.classList.remove('invalid');
        nameError.textContent = '';

        if (value.length === 0 && !isTyping) {
             nameError.textContent = 'Name is required.';
             nameInput.classList.add('invalid');
             return false;
        }
        if (value.length > 0 && (value.length < 2 || value.length > 15)) {
            nameError.textContent = 'Name must be between 2 and 15 characters.';
            nameInput.classList.add('invalid');
            return false;
        }
        if (value.length > 0 && !alphanumericRegex.test(value)) {
            nameError.textContent = 'Name must be alphanumeric.';
            nameInput.classList.add('invalid');
            return false;
        }
        return true;
    },

    validateEmail: (isTyping = false) => {
        const emailInput = document.getElementById('email');
        if (!emailInput) return false;
        const emailError = document.getElementById('email-error');
        if (!emailError) return false;
        const value = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        emailInput.classList.remove('invalid');
        emailError.textContent = '';

        if (value.length === 0 && !isTyping) {
            emailError.textContent = 'Email is required.';
            emailInput.classList.add('invalid');
            return false;
        }
        if (value.length > 0 && !emailRegex.test(value)) {
            emailError.textContent = 'Invalid email format.';
            emailInput.classList.add('invalid');
            return false;
        }
        return true;
    },

    validateDescription: (isTyping = false) => {
        const descriptionInput = document.getElementById('description');
        if (!descriptionInput) return false;
        const descriptionError = document.getElementById('description-error');
        if (!descriptionError) return false;
        const value = descriptionInput.value.trim();
        const alphanumericRegex = /^[a-zA-Z0-9\s]+$/;

        descriptionInput.classList.remove('invalid');
        descriptionError.textContent = '';

        if (value.length === 0 && !isTyping) {
            descriptionError.textContent = 'Description is required.';
            descriptionInput.classList.add('invalid');
            return false;
        }
        if (value.length > 0 && (value.length < 5 || value.length > 25)) {
            descriptionError.textContent = 'Description must be between 5 and 25 characters.';
            descriptionInput.classList.add('invalid');
            return false;
        }
        if (value.length > 0 && !alphanumericRegex.test(value)) {
            descriptionError.textContent = 'Description must be alphanumeric (spaces allowed).';
            descriptionInput.classList.add('invalid');
            return false;
        }
        return true;
    },

    viewData: () => {
        const isValidName = textBoxLib.validateName();
        const isValidEmail = textBoxLib.validateEmail();
        const isValidDescription = textBoxLib.validateDescription();

        const outputDiv = document.getElementById('output-data');
        if (!outputDiv) return;

        if (isValidName && isValidEmail && isValidDescription) {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const description = document.getElementById('description').value;
            outputDiv.textContent = `Name: ${name}\nEmail: ${email}\nDescription: ${description}`;
        } else {
            outputDiv.textContent = 'Please correct the errors in the form.';
        }
    },

    clearData: () => {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const descriptionInput = document.getElementById('description');
        const outputDiv = document.getElementById('output-data');

        if (nameInput) nameInput.value = '';
        if (emailInput) emailInput.value = '';
        if (descriptionInput) descriptionInput.value = '';
        if (outputDiv) outputDiv.textContent = '';

        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const descriptionError = document.getElementById('description-error');

        if (nameError) nameError.textContent = '';
        if (nameInput) nameInput.classList.remove('invalid');
        if (emailError) emailError.textContent = '';
        if (emailInput) emailInput.classList.remove('invalid');
        if (descriptionError) descriptionError.textContent = '';
        if (descriptionInput) descriptionInput.classList.remove('invalid');
    }
};
console.log("TextBox Library Logic Loaded (External)");