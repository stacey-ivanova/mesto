import { cardsInitial } from "./cards.js";
import { FormValidator, validationData } from "./FormValidator.js";
import { Card } from "./Card.js";
import { photoPopup } from "./Card.js";

// переменные попапа
const profilePopup = document.querySelector(".popup_type_profile");
const cardPopup = document.querySelector(".popup_type_card");
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

// экземпляр класса
const formProfileValidator = new FormValidator(
  validationData,
  formElementProfile
);
formProfileValidator.enableValidation();
const formCardValidator = new FormValidator(validationData, formElementCard);
formCardValidator.enableValidation();

// функция создания карточек
function createCard(item) {
  const card = new Card(item.name, item.link, "#card");
  const cardElement = card.generateCard();
  return cardElement;
}
// функции отрисовки карточек

cardsInitial.forEach((item) => {
  const cardElement = createCard(item);
  elementsContainer.prepend(cardElement);
});

function renderCard(titleValue, linkValue) {
  const cardElement = createCard(item);
  elementsContainer.prepend(cardElement);
  elementsContainer.prepend(cardElement);
}

// функция закрытия попапа по esc
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

// функия открытия попапа
export function openPopup(item) {
  item.classList.add("popup_opened");
  item.addEventListener("click", closePopupByOverlay);
  document.addEventListener("keydown", closePopupByEsc);
  if (item === "profilePopup") {
    formProfileValidator.resetValidation();
  } else {
    formCardValidator.resetValidation();
  }
}

function openProfilePopup(item) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(item);
}

// функция закрытия попапа
export function closePopup(item) {
  item.classList.remove("popup_opened");
  item.removeEventListener("click", closePopupByOverlay);
  document.removeEventListener("keydown", closePopupByEsc);
}

// функция заполнения и отправки попапа профиля
function handleSubmitProfileForm(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  formProfileValidator.resetValidation();
  closePopup(profilePopup);
}

// функция заполнения и отправки попапа карточек
function handleSubmitCardForm(evt) {
  evt.preventDefault();
  const titleValue = titleInput.value;
  const linkValue = linkInput.value;
  renderCard(titleValue, linkValue);
  formCardValidator.resetValidation();
  closePopup(cardPopup);
}

// функция закрытия попапа по нажатию на оверлей
function closePopupByOverlay(evt) {
  if (!evt.target.closest(".popup__content")) {
    closePopup(evt.target);
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
photoCloseButton.addEventListener("click", () => {
  closePopup(photoPopup);
});

//слушатели отправки формы попапа профиля
formElementProfile.addEventListener("submit", handleSubmitProfileForm);

//слушатели отправки формы попапа карточек
formElementCard.addEventListener("submit", handleSubmitCardForm);
