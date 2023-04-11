const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    activeButtonClass: 'popup__submit-button_enabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_visible',
  };

const enableValidation = ({ formSelector, ...rest }) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach(form => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form, rest);
  });
};

const setEventListeners = (form, { inputSelector, submitButtonSelector, ...rest }) => {
  const formInputs = Array.from(form.querySelectorAll(inputSelector));
  const formButton = form.querySelector(submitButtonSelector);
  disableButton(formButton, rest);
  formInputs.forEach(input => {
    input.addEventListener('input', () => {
      checkInputValidity(input, rest);
      if (hasInvalidInput(formInputs)) {
        disableButton(formButton, rest);
      } else {
        enableButton(formButton, rest);
      }
    });
  });
};

const checkInputValidity = (input, { errorClass, inputErrorClass, ...rest }) => {
  const errorContainer = document.querySelector(`#${input.id}-error`);
  if (input.checkValidity()) {
    errorContainer.textContent = '';
    errorContainer.classList.remove(errorClass);
    input.classList.remove(inputErrorClass);
  } else {
    errorContainer.textContent = input.validationMessage;
    errorContainer.classList.add(errorClass);
    input.classList.add(inputErrorClass);
  }
};

const hasInvalidInput = (formInputs) => {
  return formInputs.some(item => !item.validity.valid);
};

const enableButton = (button, { inactiveButtonClass, activeButtonClass }) => {
  button.classList.remove(inactiveButtonClass);
  button.classList.add(activeButtonClass);
  button.removeAttribute('disabled');
};

const disableButton = (button, { inactiveButtonClass, activeButtonClass }) => {
  button.classList.add(inactiveButtonClass);
  button.classList.remove(activeButtonClass);
  button.setAttribute('disabled', true);
};

enableValidation(validationConfig);
