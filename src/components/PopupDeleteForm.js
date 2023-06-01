import Popup from "./Popup.js";

export default class PopupDeleteForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
      super(popupSelector);
      this._handleFormSubmit = handleFormSubmit;
    }
    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._handleFormSubmit({ card: this._card, cardId: this._cardId })
        });
    }
    open = ({ card, cardId }) => {
      super.open();
      this._card = card;
      this._cardId = cardId;
    }
}