export default class Card {
  constructor(item, templateSelector, openPopupPictureZoom, openDeletePopup, functionLike) {
    this._item = item;
    this._templateSelector = templateSelector;
    this._openPopupPictureZoom = openPopupPictureZoom;
    this._openDeletePopup = openDeletePopup;
    this._functionLike = functionLike;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardElement;
  }

  _handleLikeCard = () => {
    this._functionLike(this._cardElementLikeButton, this._item._id)
  }
  toggleLike(likes) {
    this._cardElementLikeButton.classList.toggle('element__button-like_active');
    this._counter.textContent = likes.length
  }
  _checkLike() {
    this._item.likes.forEach(element => {
      if (element._id === this._item.userId) {
        this._cardElementLikeButton.classList.add('element__button-like_active');
        return
      }
    });
    this._counter.textContent = this._item.likes.length
    }

  _handleDeleteCard = () => {
    this._openDeletePopup({ card: this, cardId: this._item._id });
  }

  _handleOpenImage = () => {
    this._openPopupPictureZoom(this._item);
  }
  removeCard() {
    this._htmlElementCard.remove();
    this._htmlElementCard = null;
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
    this._counter = this._htmlElementCard.querySelector('.element__counter-like');
    this._cardElementPicture.src = this._item.link;
    this._cardElementPicture.alt = this._item.name;
    this._cardElementTitle.textContent = this._item.name;
    this._checkLike();
    if(this._item.userId === this._item.owner.id) {
      this._cardElementDeleteButton.style.display = 'block'
    } else {
      this._cardElementDeleteButton.style.display = 'none'
    }
    this._setEventListeners();
    return this._htmlElementCard;
  }
}