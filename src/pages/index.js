import './index.css';
import {
  popupEditProfile,
  popupEditProfileButtonOpen,
  popupEditCard,
  popupEditCardButtonOpen,
  popupEditAvatar,
  popupEditAvatarButtonOpen,
  templateSelector,
  popupEditProfileSelector,
  popupEditAvatarSelector,
  popupEditCardSelector,
  popupDeleteSelector,
  popupImageSelector,
  cardListSelector,
  validationConfig
 } from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteForm from '../components/PopupDeleteForm.js';
import Api from '../components/Api.js'
const userInfo = new UserInfo({
  userNameSelector: '.profile__info-name',
  userActivitySelector: '.profile__info-job',
  userAvatarSelector: '.profile__avatar'
});
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '2a75c116-0f87-4f01-83e5-3b330104bfdd',
    'Content-Type': 'application/json'
  }
});

const validationPopupEditProfile = new FormValidator(validationConfig, popupEditProfile);
const validationPopupEditCard = new FormValidator(validationConfig, popupEditCard);
const validationPopupEditAvatar = new FormValidator(validationConfig, popupEditAvatar)
validationPopupEditProfile.enableValidation();
validationPopupEditCard.enableValidation();
validationPopupEditAvatar.enableValidation();

const deletePopup = new PopupDeleteForm (popupDeleteSelector, ({ card, cardId }) => {
  api.deleteCard(cardId)
  .then(() => {
    card.removeCard()
    deletePopup.close()
  })
  .catch((error) => {
    console.log(`Ошибка в блоке удаления карточки, ${error}`)
    })
});
deletePopup.setEventListeners();

const popupImage = new PopupWithImage(popupImageSelector);
popupImage.setEventListeners();

const cardList = new Section(
  (element) => {
    cardList.addItem(createNewCard(element))
  }, cardListSelector);

function createNewCard(element) {
  const cardInitial = new Card(element, templateSelector, popupImage.open, deletePopup.open, (likeButton, cardId) => {
    if(!likeButton.classList.contains('element__button-like_active')) {
      api.addLike(cardId)
      .then(res => {
        cardInitial.toggleLike(res.likes)
      })
      .catch((error) => {
        console.log(`Ошибка при постановке лайка, ${error}`)
      })
    } else {
      api.deleteLike(cardId)
      .then(res => {
        cardInitial.toggleLike(res.likes)
      })
      .catch((error) => {
        console.log(`Ошибка при снятии лайка, ${error}`)
      })
    }
  });
    return cardInitial.createCard();
}

const popupUserInfo = new PopupWithForm(popupEditProfileSelector, (data) => {
  api.setUserInfo(data)
  .then((res) => {userInfo.setUserInfo({ username: res.name, job: res.about, avatar: res.avatar });
  popupUserInfo.close()
})
  .catch((error) => {
  console.log(`Ошибка в блоке редактирования профиля, ${error}`)
  })
  .finally(() => {
    popupUserInfo.setDefaultText()
  })
})

popupUserInfo.setEventListeners();

const popupAddCard = new PopupWithForm(popupEditCardSelector, (data) => {
  Promise.all([api.getUserInfo(), api.addCard(data)])
  .then(([userData, cardData]) => {
    userData._id = cardData.userId;
    cardList.addItem(createNewCard(cardData));
    popupAddCard.close()
  })
  .catch((error) => {
    console.log(`Ошибка в блоке создании карточки, ${error}`)
    })
    .finally(() => {
      popupAddCard.setDefaultText()
    })
})
popupAddCard.setEventListeners();

const popupAddAvatar = new PopupWithForm(popupEditAvatarSelector, (data) => {
  api.setUserAvatar(data)
  .then(res => {
    userInfo.setUserInfo({ username: res.name, job: res.about, avatar: res.avatar });
    popupAddAvatar.close()
  })
  .catch((error) => {
    console.log(`Ошибка в блоке обновления аватара, ${error}`)
    })
    .finally(() => {
      popupAddAvatar.setDefaultText()
    })
  popupAddAvatar.close()
})
popupAddAvatar.setEventListeners();

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

popupEditAvatarButtonOpen.addEventListener('click', () =>{
  validationPopupEditAvatar.resetValidationError();
  popupAddAvatar.open();
});

Promise.all([api.getUserInfo(), api.getCards()])
.then(([ userData, cardData ]) => {
  userInfo.setUserInfo({ username: userData.name, job: userData.about, avatar: userData.avatar });
  cardData.forEach(element => element.userId = userData._id);
  cardList.renderItems(cardData.reverse());
})
.catch((error) => {
  console.log(`Ошибка в блоке создания начальных данных страницы, ${error}`)
})