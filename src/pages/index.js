import './index.css';
import {
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
 } from '../components/utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';

const userInfo = new UserInfo({
  userNameSelector: '.profile__info-name',
  userActivitySelector: '.profile__info-job',
});

const validationPopupEditProfile = new FormValidator(validationConfig, popupEditProfile);
const validationPopupEditCard = new FormValidator(validationConfig, popupEditCard);
validationPopupEditProfile.enableValidation();
validationPopupEditCard.enableValidation();

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

const cardList = new Section({
  items: initialCards,
  renderer: (element) => {
    cardList.addItem(createNewCard(element))
  }
}, cardListSelector);
cardList.renderItems();

function createNewCard(element) {
  const cardInitial = new Card(element, templateSelector, popupImage.open);
    return cardInitial.createCard();
}

const popupUserInfo = new PopupWithForm(popupEditProfileSelector, (data) => {
  userInfo.setUserInfo(data);
  popupUserInfo.close()
});
popupUserInfo.setEventListeners();

const popupAddCard = new PopupWithForm(popupEditCardSelector, (data) => {
    cardList.addItem(createNewCard(data));
    popupAddCard.close()
  }
)
popupAddCard.setEventListeners();

popupEditProfileButtonOpen.addEventListener('click', function () {
  validationPopupEditProfile.resetValidationError();
  popupUserInfo.setInputValues(userInfo.getUserInfo());
  popupUserInfo.open();
});

popupEditCardButtonOpen.addEventListener('click', () => {
  validationPopupEditCard.disableButtonOnPopup();
  validationPopupEditCard.resetValidationError();
  popupAddCard.open();
});