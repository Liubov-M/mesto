export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonClose = this._popup.querySelector('.popup__close-button');
    this._formElement = this._popup.querySelector('.popup__form');
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
        this.close();
      };
  }

  _handleClickOnOverlay = (evt) => {
    if (evt.target !== evt.currentTarget) {
        return;
      };
    this.close();
  }

  _handleButtonClose = () => {
    this.close();
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
  setEventListeners() {
    this._buttonClose.addEventListener('click', this._handleButtonClose);
    this._popup.addEventListener('mousedown', this._handleClickOnOverlay);
  }
}