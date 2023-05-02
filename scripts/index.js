import initialCards from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const popupEditProfile = document.querySelector('[name="profile-form"]');//это форма
const popupEditProfileOverlay = document.querySelector('#edit-profile');
const popupEditProfileButtonClose = popupEditProfile.querySelector('.popup__close-button');
const popupEditProfileButtonOpen = document.querySelector('.profile__edit-button');
const usernameInput = popupEditProfile.querySelector('#firstname');//это инпут
const userActivityInput = popupEditProfile.querySelector('#job');//это инпут
const usernameProfileInfo = document.querySelector('.profile__info-name');
const userActivityProfileInfo = document.querySelector('.profile__info-job');
const popupEditCard = document.querySelector('[name="cards-form"]');//это форма
const popupEditCardOverlay = document.querySelector('#edit-cards');
const popupEditCardButtonClose = popupEditCard.querySelector('.popup__close-button');
const popupEditCardButtonOpen = document.querySelector('.profile__button');
const objectInput = popupEditCard.querySelector('#object');//это инпут
const linkInput = popupEditCard.querySelector('#link');//это инпут
const cardList = document.querySelector('.elements');
const popupPictureZoom = document.querySelector('#open-image');
const popupPictureZoomButtonClose = popupPictureZoom.querySelector('.popup__close-button');
const popupPictureZoomObjectImage = popupPictureZoom.querySelector('.popup__image');
const popupPictureZoomObjectName = popupPictureZoom.querySelector('.popup__title');
const templateSelector = '.elements-template';
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  activeButtonClass: 'popup__submit-button_enabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
};
const validationPopupEditProfile = new FormValidator(validationConfig, popupEditProfile);
const validationPopupEditCard = new FormValidator(validationConfig, popupEditCard);
validationPopupEditProfile.enableValidation();
validationPopupEditCard.enableValidation();

function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByClickOnEsc);
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByClickOnEsc);
}

//сохранение данных профиля
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  usernameProfileInfo.textContent = usernameInput.value;
  userActivityProfileInfo.textContent = userActivityInput.value;
  closePopup(popupEditProfileOverlay);
}

//сохранение данных галереи
function handleCardFormSubmit (evt) {
  evt.preventDefault();
  const item = { name:objectInput.value, link:linkInput.value };
  renderInitialCard(item);
  evt.target.reset();
  closePopup(popupEditCardOverlay);
}

//создание карточки
function renderInitialCard (element) {
  const cardInitial = new Card(element, templateSelector, openPopupPictureZoom);
  cardList.prepend(cardInitial.createCard());
}

//открытие попап-карточки
function openPopupPictureZoom (item) {
  popupPictureZoomObjectImage.src = item.link;
  popupPictureZoomObjectImage.alt = item.name;
  popupPictureZoomObjectName.textContent = item.name;
  popupPictureZoom.classList.add('popup_opened_opaque');
  openPopup(popupPictureZoom);
};

function closePopupByClickOnOverlay (evt) {
if (evt.target !== evt.currentTarget) {
  return;
};
  const popupActive = document.querySelector('.popup_opened');
  closePopup(popupActive);
};

function closePopupByClickOnEsc (evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  };
};

initialCards.forEach(renderInitialCard);

popupEditProfileButtonOpen.addEventListener('click', function () {
  openPopup(popupEditProfileOverlay);
  usernameInput.value = usernameProfileInfo.textContent;
  userActivityInput.value = userActivityProfileInfo.textContent;});
popupEditProfileButtonClose.addEventListener('click', () => closePopup(popupEditProfileOverlay));
popupEditProfile.addEventListener('submit', handleProfileFormSubmit);
popupEditCardButtonOpen.addEventListener('click', () => openPopup(popupEditCardOverlay));
popupEditCardButtonClose.addEventListener('click', () => closePopup(popupEditCardOverlay));
popupEditCard.addEventListener('submit', handleCardFormSubmit);
popupPictureZoomButtonClose.addEventListener('click', function () {
  popupPictureZoom.classList.toggle('popup_opened_opaque');
  closePopup(popupPictureZoom);
});
popupEditProfileOverlay.addEventListener('mousedown', closePopupByClickOnOverlay);
popupEditCardOverlay.addEventListener('mousedown', closePopupByClickOnOverlay);
popupPictureZoom.addEventListener('mousedown', closePopupByClickOnOverlay);