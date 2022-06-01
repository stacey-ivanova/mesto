import "../pages/index.css";
import {
  cardsInitial,
  validationData,
  formElementProfile,
  formElementCard,
  elementsContainer,
  cardPopup,
  profilePopup,
  photoPopup,
  jobInput,
  nameInput,
  buttonEdit,
  buttonAdd,
  profileName,
  profileJob,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

// экземпляр класса
const formProfileValidator = new FormValidator(
  validationData,
  formElementProfile
);
formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validationData, formElementCard);
formCardValidator.enableValidation();

const defaultCardList = new Section(
  {
    items: cardsInitial,
    renderer: (item) => {
      const cardElement = createCard(item);
      defaultCardList.addItem(cardElement);
    },
  },
  elementsContainer
);
defaultCardList.renderItems();

const popupCardForm = new PopupWithForm(
  {
    handleSubmitForm: (evt) => {
      evt.preventDefault();
      const formValue = popupCardForm._getInputValues();
      renderCard(formValue);
      popupCardForm.close();
    },
  },
  cardPopup
);

const popupProfileForm = new PopupWithForm(
  {
    handleSubmitForm: (evt) => {
      evt.preventDefault();
      const user = popupProfileForm._getInputValues();
      userData.setUserInfo(user);
      popupProfileForm.close();
    },
  },
  profilePopup
);

const popupWithPhoto = new PopupWithImage(photoPopup);

const userData = new UserInfo(profileName, profileJob);

// функция создания карточек
function createCard(item) {
  const card = new Card(item.title, item.link, "#card", {
    handleCardClick: () => {
      const titleValue = item.title;
      const linkValue = item.link;
      popupWithPhoto.open(titleValue, linkValue);
    },
  });
  const cardElement = card.generateCard();
  return cardElement;
}

function renderCard(item) {
  const cardElement = createCard(item);
  defaultCardList.addItem(cardElement);
}

//слушатели открытия попапов
buttonEdit.addEventListener("click", function () {
  popupProfileForm.open();
  const profileInfo = userData.getUserInfo();
  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.job;
  formProfileValidator.resetValidation();
});

buttonAdd.addEventListener("click", function () {
  // formElementCard.reset();
  formCardValidator.resetValidation();
  popupCardForm.open();
});
