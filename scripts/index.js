const popupEditProfile = document.querySelector('[name="profile-form"]');
const popupEditProfileOverlay = document.querySelector('#edit-profile');
const popupEditProfileButtonClose = popupEditProfile.querySelector('.popup__close-button');
const popupEditProfileButtonOpen = document.querySelector('.profile__edit-button');
const usernameInput = popupEditProfile.querySelector('[name="firstname"]');
const uesrActivityInput = popupEditProfile.querySelector('[name="job"]');
const popupEditProfileButtonSubmit = popupEditProfile.querySelector('.popup__submit-button');
const usernameProfileInfo = document.querySelector('.profile__info-name');
const userActivityProfileInfo = document.querySelector('.profile__info-job');
const popupEditCard = document.querySelector('[name="edit-cards"]');
const popupEditCardOverlay = document.querySelector('#edit-cards');
const popupEditCardButtonClose = popupEditCard.querySelector('.popup__close-button');
const popupEditCardButtonOpen = document.querySelector('.profile__button');
const popupEditCardButtonSubmit = popupEditCard.querySelector('.popup__submit-button');
const objectInput = popupEditCard.querySelector('[name="object"]');
const linkInput = popupEditCard.querySelector('[name="link"]');
const cardTemplate = document.querySelector('.elements-template').content;
const cardList = document.querySelector('.elements');
const popupPicture = document.querySelector('#open-image');
const popupPictureButtonClose = popupPicture.querySelector('.popup__close-button');
const popupPictureObjectImage = popupPicture.querySelector('.popup__image');
const popupPictureObjectName = popupPicture.querySelector('.popup__title');

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
  userActivityProfileInfo.textContent = uesrActivityInput.value;
  closePopup(popupEditProfileOverlay);
}

//сохранение данных галереи
function handleCardFormSubmit (evt) {
  evt.preventDefault();
  let item = { name:objectInput.value, link:linkInput.value}
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
  const htmlElement = cardTemplate.cloneNode(true);
  const cardElement = htmlElement.querySelector('.element__image');
  const titleElement = htmlElement.querySelector('.element__title');
  cardElement.src = item.link;
  cardElement.alt = item.name;
  titleElement.textContent = item.name;
  htmlElement.querySelector('.element__delete-button').addEventListener('click', handleDeleteCard);
  htmlElement.querySelector('.element__button-like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__button-like_active');
  });
  htmlElement.querySelector('.element__image').addEventListener('click', () => openPopupPicture(item));
  return htmlElement;
};

//удаление карточки
function handleDeleteCard (evt) {
  const card = evt.target.closest('.element');
  card.remove();
};

//открытие попап-карточки
function openPopupPicture (item) {
  popupPictureObjectImage.src = item.link;
  popupPictureObjectImage.alt = item.name;
  popupPictureObjectName.textContent = item.name;
  popupPicture.setAttribute('style', 'background-color: rgba(0, 0, 0, 0.9)');
  openPopup(popupPicture);
};

initialCards.forEach(renderInitialCard);

popupEditProfileButtonOpen.addEventListener('click', function () {
  openPopup(popupEditProfileOverlay);
  usernameInput.value = usernameProfileInfo.textContent;
  uesrActivityInput.value = userActivityProfileInfo.textContent;});
popupEditProfileButtonClose.addEventListener('click', () => closePopup(popupEditProfileOverlay));
popupEditProfile.addEventListener('submit', handleProfileFormSubmit);
popupEditCardButtonOpen.addEventListener('click', () => openPopup(popupEditCardOverlay));
popupEditCardButtonClose.addEventListener('click', () => closePopup(popupEditCardOverlay));
popupEditCard.addEventListener('submit', handleCardFormSubmit);
popupPictureButtonClose.addEventListener('click', function() {
  popupPicture.setAttribute('style', 'background-color: rgba(0, 0, 0, 0.9)');
  closePopup(popupPicture);
});