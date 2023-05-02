export default class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formElement = formElement;
  }

//показать ошибку
  _showValidationError(input) {
    const errorContainer = this._formElement.querySelector(`#${input.id}-error`);
    errorContainer.textContent = input.validationMessage;
    errorContainer.classList.add(this._validationConfig.errorClass);
    input.classList.add(this._validationConfig.inputErrorClass);
  }

//скрыть ошибку
  _hideValidationError(input) {
    const errorContainer = this._formElement.querySelector(`#${input.id}-error`);
    errorContainer.textContent = '';
    errorContainer.classList.remove(this._validationConfig.errorClass);
    input.classList.remove(this._validationConfig.inputErrorClass);
  }

//проверить валидность формы
  _checkInputValidity(input) {
    if (input.checkValidity()) {
    this._hideValidationError(input);
    } else {
    this._showValidationError(input);
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
    this._formInputs = Array.from(this._formElement.querySelectorAll(this._validationConfig.inputSelector));
    this._formButton = this._formElement.querySelector(this._validationConfig.submitButtonSelector);
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
}