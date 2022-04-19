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
const cardTemplate = document.querySelector("#card").content;

// переменные попапа фото
const photoItem = photoPopup.querySelector(".popup__photo");
const caption = photoPopup.querySelector(".popup__photo-caption");

// переменная esc
const ESC_KEY_CODE = 27;

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
  toggleButtonStateOnStart(item, validationData);
}

function openPhotoPopup(item, photo, photoCaption) {
  photoItem.src = photo;
  caption.textContent = photoCaption;
  photoItem.alt = photoCaption;
  openPopup(item);
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
  toggleButtonStateOnStart(cardPopup, validationData);
}

// функция создания карточек
function createCard(titleValue, linkValue) {
  const cardElement = cardTemplate.querySelector(".element").cloneNode(true);
  cardElement.querySelector(".element__text").textContent = titleValue;
  const cardPhoto = cardElement.querySelector(".element__photo");
  cardPhoto.src = linkValue;
  cardPhoto.alt = titleValue;
  cardElement
    .querySelector(".element__trash")
    .addEventListener("click", deleteCard);
  cardElement
    .querySelector(".element__like")
    .addEventListener("click", likeCard);
  cardPhoto.addEventListener("click", function () {
    openPhotoPopup(photoPopup, linkValue, titleValue);
  });
  return cardElement;
}

// функция отрисовки карточек
function renderCard(titleValue, linkValue) {
  const renderedCard = createCard(titleValue, linkValue);
  elementsContainer.prepend(renderedCard);
}

// функция лайка карточек
function likeCard(evt) {
  evt.target.classList.toggle("element__like_active");
}

// функция удаления карточек
function deleteCard(evt) {
  evt.target.closest(".element").remove();
}

// функция добавления карточек при загурзке
cardsInitial.forEach(function (card) {
  renderCard(card.name, card.link);
});

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

// функция вызова функции esc

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
photoCloseButton.addEventListener("click", function () {
  closePopup(photoPopup);
});

//слушатели отправки формы попапа профиля
formElementProfile.addEventListener("submit", handleSubmitProfileForm);

//слушатели отправки формы попапа карточек
formElementCard.addEventListener("submit", handleSubmitCardForm);

// возможность сохранения форма профайл
// const inputList = Array.from(item.querySelectorAll('.popup__input'));
// console.log(inputList);
// const buttonSubmit = item.querySelector('.popup__submit-button');
// console.log(buttonSubmit);
// toggleButtonState(inputList, buttonSubmit);

//блокировка кнопки после создания карточки
// const inputList = Array.from(cardPopup.querySelectorAll('.popup__input'));
//   console.log(inputList);
//   const buttonSubmit = cardPopup.querySelector('.popup__submit-button');
//   console.log(buttonSubmit);
//   toggleButtonState(inputList, buttonSubmit);
