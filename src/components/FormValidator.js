export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
    this._formInputs = Array.from(formElement.querySelectorAll(this._validationConfig.inputSelector));
    this._formButton = formElement.querySelector(this._validationConfig.submitButtonSelector);
  }

//показать ошибку
  _showValidationError(errorContainer, input) {
    errorContainer.textContent = input.validationMessage;
    errorContainer.classList.add(this._validationConfig.errorClass);
    input.classList.add(this._validationConfig.inputErrorClass);
  }

//скрыть ошибку
  _hideValidationError(errorContainer, input) {
    errorContainer.textContent = '';
    errorContainer.classList.remove(this._validationConfig.errorClass);
    input.classList.remove(this._validationConfig.inputErrorClass);
  }

//проверить валидность формы
  _checkInputValidity(input) {
    const errorContainer = this._formElement.querySelector(`#${input.id}-error`);
    if (input.checkValidity()) {
    this._hideValidationError(errorContainer, input);
    } else {
    this._showValidationError(errorContainer, input);
    }
  }

//проверить инпут на ошибки
  _hasInvalidInput() {
    return this._formInputs.some(item => !item.validity.valid);
  }

//включить кнопку
  _enableButton() {
    this._formButton.classList.remove(this._validationConfig.inactiveButtonClass);
    this._formButton.classList.add(this._validationConfig.activeButtonClass);
    this._formButton.removeAttribute('disabled');
  }

//выключить кнопку
  _disableButton() {
    this._formButton.classList.add(this._validationConfig.inactiveButtonClass);
    this._formButton.classList.remove(this._validationConfig.activeButtonClass);
    this._formButton.setAttribute('disabled', true);
  }

//переключить состояние кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
    this._disableButton();
    } else {
    this._enableButton();
    }
  }

  _setEventListeners() {
    this._disableButton();
    this._formInputs.forEach(input => {
    input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
    });
    });
  }

//включить валидацию
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
    evt.preventDefault()});
    this._setEventListeners();
  }

//сброс ошибки
  resetValidationError() {
    this._formInputs.forEach(input => {
      const errorContainer = this._formElement.querySelector(`#${input.id}-error`);
      if (!input.checkValidity()) {
        this._hideValidationError(errorContainer, input);
        }
    });
    this._disableButton();
   }
//блокировка кнопки сабмит при открытии
  disableButtonOnPopup() {
    this._formButton.setAttribute('disabled', true);
    this._formButton.classList.add(this._validationConfig.inactiveButtonClass);
  }
}