const initialCards = [
    {
      title: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      title: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      title: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      title: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      title: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      title: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const popupEditProfile = document.querySelector('[name="profile-form"]');
const popupEditProfileButtonOpen = document.querySelector('.profile__edit-button');
const popupEditCard = document.querySelector('[name="cards-form"]');
const popupEditCardButtonOpen = document.querySelector('.profile__button');
const templateSelector = '.elements-template';
const popupEditProfileSelector = '#edit-profile';
const popupEditCardSelector = '#edit-cards';
const popupImageSelector = '#open-image';
const cardListSelector = '.elements';
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  activeButtonClass: 'popup__submit-button_enabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
};

export {
  initialCards,
  popupEditProfile,
  popupEditProfileButtonOpen,
  popupEditCard,
  popupEditCardButtonOpen,
  templateSelector,
  popupEditProfileSelector,
  popupEditCardSelector,
  popupImageSelector,
  cardListSelector,
  validationConfig
 };