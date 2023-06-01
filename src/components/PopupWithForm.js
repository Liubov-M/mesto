import Popup from "./Popup.js"
export default class PopupWithForm extends Popup {
  constructor(selector, handleFormSubmit) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._formElement.querySelectorAll('.popup__input');
    this._submitButton = this._formElement.querySelector('.popup__submit-button');
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    })
    return this._inputValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = 'Сохранение...'
      this._handleFormSubmit(this._getInputValues());
    });
  }
  setDefaultText() {
    this._submitButton.textContent = this._submitButtonText
  }
  setInputValues(data) {
    this._inputList.forEach((input) => {
        input.value = data[input.name];
    });
  }
  close() {
  super.close();
  this._formElement.reset();
  }
}

