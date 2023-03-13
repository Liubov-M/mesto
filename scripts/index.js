const popupElement = document.querySelector('[name="profile-form"]');
const popupOverlay = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
let nameInput = popupElement.querySelector('[name="firstname"]');
let jobInput = popupElement.querySelector('[name="job"]');
const popupSubmitButton = popupElement.querySelector('.popup__submit-button');
let firstName = document.querySelector('.profile__info-name');
let aboutMe = document.querySelector('.profile__info-job');

const openPopup = function () {
  popupOverlay.classList.add('popup_opened');
  nameInput.value = firstName.textContent;
  jobInput.value = aboutMe.textContent;
};

const closePopup = function () {
  popupOverlay.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  firstName.textContent = nameInput.value;
  aboutMe.textContent = jobInput.value;
  closePopup();
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('submit', handleFormSubmit);
