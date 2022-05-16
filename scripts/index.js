import { cardsInitial } from "./cards.js";
import { FormValidator, validationData } from "./validate.js";

// переменные попапа
const profilePopup = document.querySelector(".popup_type_profile");
const cardPopup = document.querySelector(".popup_type_card");
const photoPopup = document.querySelector(".popup_type_photo");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const profileCloseButton = profilePopup.querySelector(".popup__close-button");
const cardCloseButton = cardPopup.querySelector(".popup__close-button");
const photoCloseButton = photoPopup.querySelector(".popup__close-button");

// переменные формы заполнения попапа профиля
const formElementProfile = profilePopup.querySelector(
  ".popup__form_type_profile"
);
const nameInput = formElementProfile.querySelector(".popup__input_type_name");
const jobInput = formElementProfile.querySelector(".popup__input_type_job");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");

// переменные формы заполнения попапа новой карточки
const formElementCard = cardPopup.querySelector(".popup__form_type_card");
const titleInput = formElementCard.querySelector(".popup__input_type_title");
const linkInput = formElementCard.querySelector(".popup__input_type_link");
const cardTitle = document.querySelector(".element__text");

// переменные исходных и новых карточек
const elementsContainer = document.querySelector(".elements");

// переменные попапа фото
const photoItem = photoPopup.querySelector(".popup__photo");
const caption = photoPopup.querySelector(".popup__photo-caption");

// переменная esc
const ESC_KEY_CODE = 27;

// экземпляр класса
const formProfileValidator = new FormValidator(
  validationData,
  formElementProfile
);
formProfileValidator.enableValidation();
const formCardValidator = new FormValidator(validationData, formElementCard);
formCardValidator.enableValidation();

// объект карточки
class Card {
  constructor(titleValue, linkValue, cardSelector) {
    this._titleValue = titleValue;
    this._linkValue = linkValue;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardPhoto = this._element.querySelector(".element__photo");
    this._setEventListeners();
    this._element.querySelector(".element__text").textContent =
      this._titleValue;
    this._cardPhoto.src = this._linkValue;
    this._cardPhoto.alt = this._titleValue;
    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__trash")
      .addEventListener("click", () => {
        this._deleteCard();
      });

    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._likeCard();
      });

    this._cardPhoto.addEventListener("click", () => {
      this._openPhotoPopup();
    });

    photoCloseButton.addEventListener("click", () => {
      closePopup(photoPopup);
    });
  }

  // метод лайка карточек
  _likeCard() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }

  // метод удаления карточек
  _deleteCard() {
    this._element.closest(".element").remove();
  }

  // метод открытия попапа
  _openPhotoPopup() {
    photoItem.src = this._linkValue;
    caption.textContent = this._titleValue;
    photoItem.alt = this._titleValue;
    openPopup(photoPopup);
  }
}

// функция создания карточек
cardsInitial.forEach((item) => {
  const card = new Card(item.name, item.link, "#card");
  const cardElement = card.generateCard();
  document.querySelector(".elements").prepend(cardElement);
});

// функция отрисовки карточек
function renderCard(titleValue, linkValue) {
  const card = new Card(titleValue, linkValue, "#card");
  const cardElement = card.generateCard();
  document.querySelector(".elements").prepend(cardElement);
}

// функия открытия попапа
function openPopup(item) {
  item.classList.add("popup_opened");
  item.addEventListener("click", closePopupByOverlay);
  document.addEventListener(
    "keyup",
    function (keyboardEvent) {
      closePopupByEsc(keyboardEvent, item);
    },
    { once: true }
  );
}

function openProfilePopup(item) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(item);
  // toggleButtonStateOnStart(item, validationData);
}

// функция закрытия попапа
function closePopup(item) {
  item.classList.remove("popup_opened");
  item.removeEventListener("click", closePopupByOverlay);
}

// функция заполнения и отправки попапа профиля
function handleSubmitProfileForm(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closePopup(profilePopup);
}

// функция заполнения и отправки попапа карточек
function handleSubmitCardForm(evt) {
  evt.preventDefault();
  const titleValue = titleInput.value;
  const linkValue = linkInput.value;

  renderCard(titleValue, linkValue);
  closePopup(cardPopup);
  formElementCard.reset();
  // toggleButtonStateOnStart(cardPopup, validationData);
}

// функция закрытия попапа по нажатию на оверлей
function closePopupByOverlay(evt) {
  if (!evt.target.closest(".popup__content")) {
    closePopup(evt.target);
  }
}

// функция закрытия попапа по нажатию на esc
function closePopupByEsc(keyboardEvent, item) {
  if (event.keyCode === ESC_KEY_CODE) {
    closePopup(item);
  }
}

//слушатели открытия попапов
buttonEdit.addEventListener("click", function () {
  openProfilePopup(profilePopup);
});
buttonAdd.addEventListener("click", function () {
  openPopup(cardPopup);
});

//слушатели закрытия попапов
profileCloseButton.addEventListener("click", function () {
  closePopup(profilePopup);
});
cardCloseButton.addEventListener("click", function () {
  closePopup(cardPopup);
});

//слушатели отправки формы попапа профиля
formElementProfile.addEventListener("submit", handleSubmitProfileForm);

//слушатели отправки формы попапа карточек
formElementCard.addEventListener("submit", handleSubmitCardForm);
