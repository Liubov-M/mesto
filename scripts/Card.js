export default class Card {
  constructor(item, templateSelector, openPopupPictureZoom) {
    this._item = item;
    this._templateSelector = templateSelector;
    this._openPopupPictureZoom = openPopupPictureZoom;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }

  _handleLikeCard(evt) {
    evt.target.classList.toggle('element__button-like_active');
  }

  _handleDeleteCard(evt) {
    const card = evt.target.closest('.element');
    card.remove();
  }

  _handleOpenImage() {
    this._openPopupPictureZoom(this._item);
  }

  _setEventListeners() {
    this._cardElementLikeButton.addEventListener('click', this._handleLikeCard);
    this._cardElementDeleteButton.addEventListener('click', this._handleDeleteCard);
    this._cardElementPicture.addEventListener('click', () => this._handleOpenImage());
  }

  createCard() {
    this._htmlElementCard = this._getTemplate();
    this._cardElementPicture = this._htmlElementCard.querySelector('.element__image');
    this._cardElementTitle = this._htmlElementCard.querySelector('.element__title');
    this._cardElementDeleteButton = this._htmlElementCard.querySelector('.element__delete-button');
    this._cardElementLikeButton = this._htmlElementCard.querySelector('.element__button-like');
    this._cardElementPicture.src = this._item.link;
    this._cardElementPicture.alt = this._item.name;
    this._cardElementTitle.textContent = this._item.name;
    this._setEventListeners();
    return this._htmlElementCard;
  }
}