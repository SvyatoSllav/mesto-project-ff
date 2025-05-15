const showError = (formErrorNode, errorMessage, errorClass) => {
    formErrorNode.textContent = errorMessage
    formErrorNode.classList.add(errorClass)
};

const hideError = (formErrorNode, errorClass) => {
    formErrorNode.textContent = ''
    formErrorNode.classList.remove(errorClass)
};

const checkInputValidity = (formElement, formInput, formSubmitButton, validationConfig) => {
    const formErrorNode = formElement.querySelector(`.${formInput.id}Error`);
    formInput.setCustomValidity('');

    if (formInput.validity.patternMismatch) {
        formInput.setCustomValidity(formInput.dataset.errorText);
        showError(formErrorNode, formInput.validationMessage, validationConfig.errorClass);
        disableSubmitButton(formSubmitButton, validationConfig.inactiveButtonClass);
    } else if (!formInput.validity.valid) {
        showError(formErrorNode, formInput.validationMessage, validationConfig.errorClass);
        disableSubmitButton(formSubmitButton, validationConfig.inactiveButtonClass);
    } else {
        hideError(formErrorNode, validationConfig.errorClass);
        if (!hasInvalidInput(formElement, validationConfig.inputSelector)) {
            enableSubmitButton(formSubmitButton, validationConfig.inactiveButtonClass)
        }
    }
};

const hasInvalidInput = (form, inputSelector) => {
    return Array.from(form.querySelectorAll(inputSelector)).some((input) => !input.validity.valid);
}

const disableSubmitButton = (buttonToDisable, disabledClass) => {
    buttonToDisable.classList.add(disabledClass);
}

const enableSubmitButton = (buttonToDisable, disabledClass) => {
    buttonToDisable.classList.remove(disabledClass);
}

const enableValidation = (validationConfig) => {
    const forms = document.querySelectorAll(validationConfig.formSelector);
    forms.forEach((form) => {
        const inputElements = Array.from(form.querySelectorAll(validationConfig.inputSelector));
        const formSubmitButton = form.querySelector(validationConfig.submitButtonSelector);
        if (hasInvalidInput(form, validationConfig.inputSelector)) {
            disableSubmitButton(formSubmitButton, validationConfig.inactiveButtonClass)
        }
        inputElements.forEach((input) => {
            input.addEventListener('input', () => checkInputValidity(form, input, formSubmitButton, validationConfig))
        })
    });
}

function clearValidation(form, validationConfig) {
    const formSubmitButton = form.querySelector(validationConfig.submitButtonSelector);
    const inputElements = Array.from(form.querySelectorAll(validationConfig.inputSelector));
    inputElements.forEach((input) => {
        const formErrorNode = form.querySelector(`.${input.id}Error`);
        hideError(formErrorNode);
    })
    if (!hasInvalidInput(form, validationConfig.inputSelector)) {
        enableSubmitButton(formSubmitButton, validationConfig.inactiveButtonClass);
    } else {
        disableSubmitButton(formSubmitButton, validationConfig.inactiveButtonClass);
    }
}

export {enableValidation, clearValidation}
