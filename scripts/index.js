const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
let nameInput = popupElement.querySelector('.popup__text_name');
let jobInput = popupElement.querySelector('.popup__text_job');
const popupSubmitButton = popupElement.querySelector('.popup__submit-button');
let firstName = document.querySelector('.profile__info-name');
let aboutMe = document.querySelector('.profile__info-job');

function handleFormSubmit (evt) {
  evt.preventDefault();
  firstName.textContent = nameInput.value;
  aboutMe.textContent = jobInput.value;
}

const openPopup = function () {
  popupElement.classList.add('popup_opened');
  nameInput.value = firstName.textContent;
  jobInput.value = aboutMe.textContent;
};

const closePopup = function () {
  popupElement.classList.remove('popup_opened');
}



popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('submit', handleFormSubmit);
popupSubmitButton.addEventListener('click', closePopup);