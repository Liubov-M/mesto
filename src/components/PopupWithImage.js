import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupObjectImage = this._popup.querySelector('.popup__image');
    this._popupObjectName = this._popup.querySelector('.popup__title');
  }
  open = (item) => {
    this._popupObjectImage.src = item.link;
    this._popupObjectImage.alt = item.title;
    this._popupObjectName.textContent = item.title;
    this._popup.classList.add('popup_opened_opaque');
    super.open();
  }
}
