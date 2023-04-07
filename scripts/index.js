const popupEditProfile = document.querySelector('[name="profile-form"]');//это форма
const popupEditProfileOverlay = document.querySelector('#edit-profile');
const popupEditProfileButtonClose = popupEditProfile.querySelector('.popup__close-button');
const popupEditProfileButtonOpen = document.querySelector('.profile__edit-button');
const usernameInput = popupEditProfile.querySelector('#firstname');//это инпут
const userActivityInput = popupEditProfile.querySelector('#job');//это инпут
const popupEditProfileButtonSubmit = popupEditProfile.querySelector('.popup__submit-button');
const usernameProfileInfo = document.querySelector('.profile__info-name');
const userActivityProfileInfo = document.querySelector('.profile__info-job');
const popupEditCard = document.querySelector('[name="cards-form"]');//это форма
const popupEditCardOverlay = document.querySelector('#edit-cards');
const popupEditCardButtonClose = popupEditCard.querySelector('.popup__close-button');
const popupEditCardButtonOpen = document.querySelector('.profile__button');
const popupEditCardButtonSubmit = popupEditCard.querySelector('.popup__submit-button');
const objectInput = popupEditCard.querySelector('#object');//это инпут
const linkInput = popupEditCard.querySelector('#link');//это инпут
const cardTemplate = document.querySelector('.elements-template').content;
const cardList = document.querySelector('.elements');
const popupPictureZoom = document.querySelector('#open-image');
const popupPictureZoomButtonClose = popupPictureZoom.querySelector('.popup__close-button');
const popupPictureZoomObjectImage = popupPictureZoom.querySelector('.popup__image');
const popupPictureZoomObjectName = popupPictureZoom.querySelector('.popup__title');
const usernameInputError = popupEditProfile.querySelector(`.${usernameInput.id}-error`);
const userActivityInputError = popupEditProfile.querySelector(`.${userActivityInput.id}-error`);
const objectInputError = popupEditCard.querySelector(`.${objectInput.id}-error`);
const linkInputError = popupEditCard.querySelector(`.${linkInput.id}-error`);

function openPopup (popup) {
  popup.classList.add('popup_opened');
}

function closePopup (popup) {
  popup.classList.remove('popup_opened');
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
  const item = { name:objectInput.value, link:linkInput.value}
  renderInitialCard(item);
  evt.target.reset();
  closePopup(popupEditCardOverlay);
}

//создание карточки
function renderInitialCard (item) {
  const cardInitial = createCard(item);
  cardList.prepend(cardInitial);
}

function createCard (item) {
  const htmlElementCard = cardTemplate.cloneNode(true);
  const cardElementPicture = htmlElementCard.querySelector('.element__image');
  const cardElementTitle = htmlElementCard.querySelector('.element__title');
  cardElementPicture.src = item.link;
  cardElementPicture.alt = item.name;
  cardElementTitle.textContent = item.name;
  htmlElementCard.querySelector('.element__delete-button').addEventListener('click', handleDeleteCard);
  htmlElementCard.querySelector('.element__button-like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__button-like_active');
  });
  htmlElementCard.querySelector('.element__image').addEventListener('click', () => openPopupPictureZoom(item));
  return htmlElementCard;
};

//удаление карточки
function handleDeleteCard (evt) {
  const card = evt.target.closest('.element');
  card.remove();
};

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
popupEditProfileOverlay.addEventListener('click', closePopupByClickOnOverlay);
popupEditCardOverlay.addEventListener('click', closePopupByClickOnOverlay);
popupPictureZoom.addEventListener('click', closePopupByClickOnOverlay);
document.addEventListener('keydown', closePopupByClickOnEsc);