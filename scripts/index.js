//функции открытия и закрытия попапа
function openNthPopup (element) {
  element.classList.add('popup_opened');
}

function closeNthPopup (element) {
  element.classList.remove('popup_opened');
}


//попап профиля
const popupElement = document.querySelector('[name="profile-form"]');
const popupOverlay = document.querySelector('#edit-profile');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
let nameInput = popupElement.querySelector('[name="firstname"]');
let jobInput = popupElement.querySelector('[name="job"]');
const popupSubmitButton = popupElement.querySelector('.popup__submit-button');
let firstName = document.querySelector('.profile__info-name');
let aboutMe = document.querySelector('.profile__info-job');

const openPopup = function () {
  openNthPopup(popupOverlay);
  nameInput.value = firstName.textContent;
  jobInput.value = aboutMe.textContent;
};
const closePopup = () => closeNthPopup(popupOverlay);

function handleFormSubmit (evt) {
  evt.preventDefault();
  firstName.textContent = nameInput.value;
  aboutMe.textContent = jobInput.value;
  closePopup();
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
popupElement.addEventListener('submit', handleFormSubmit);

//попап галереи
const popupCardsElement = document.querySelector('[name="edit-cards"]');
const popupCardsOverlay = document.querySelector('#edit-cards');
const popupCloseButtonCardsElement = popupCardsElement.querySelector('.popup__close-button');
const popupOpenButtonCardsElement = document.querySelector('.profile__button');
const popupSubmitCardsButton = popupCardsElement.querySelector('.popup__submit-button');
let objectInput = popupCardsElement.querySelector('[name="object"]');
let linkInput = popupCardsElement.querySelector('[name="link"]');

const openCardsPopup = () => openNthPopup(popupCardsOverlay);

const closeCardsPopup = () => closeNthPopup(popupCardsOverlay);

function handleCardsFormSubmit (evt) {
  evt.preventDefault();
  let item = { name:objectInput.value, link:linkInput.value}
  renderCard(item);
  closeCardsPopup();
}

popupOpenButtonCardsElement.addEventListener('click', openCardsPopup);
popupCloseButtonCardsElement.addEventListener('click', closeCardsPopup);
popupCardsElement.addEventListener('submit', handleCardsFormSubmit);

//создание галереи

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardsTemplate = document.querySelector('.elements-template').content;
const cardsList = document.querySelector('.elements');
const popupOpenCard = document.querySelector('#open-image');

initialCards.forEach(renderCard);

function renderCard (item) {
  const createCard = createCards(item);
  cardsList.prepend(createCard);
}

function createCards (item) {
  const htmlElement = cardsTemplate.cloneNode(true);
  htmlElement.querySelector('.element__image').src = item.link;
  htmlElement.querySelector('.element__image').alt = item.name;
  htmlElement.querySelector('.element__title').textContent = item.name;
  htmlElement.querySelector('.element__delete-button').addEventListener('click', handleDelete);
  htmlElement.querySelector('.element__button-like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('element__button-like_active');
  });
  htmlElement.querySelector('.element__image').addEventListener('click', () => openCard(item));
  popupOpenCard.querySelector('.popup__close-button').addEventListener('click', () => closeCard(popupOpenCard));
  return htmlElement;
};

//удаление карточки
function handleDelete (evt) {
  const card = evt.target.closest('.element');
  card.remove();
};

//открытие и закрытие попап-карточки
function openCard (item) {
  popupOpenCard.querySelector('.popup__image').src = item.link;
  popupOpenCard.querySelector('.popup__title').textContent = item.name;
  popupOpenCard.classList.add('popup_opened_opaque');
}
function closeCard (element) {
  element.classList.remove('popup_opened_opaque');
}