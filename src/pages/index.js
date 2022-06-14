import "../pages/index.css";
import {
  submitPopup,
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
  changeAva,
  profileJob,
  profileAvatar,
  avatarPopup,
  prAvatar,
} from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { caption, photoItem } from "../utils/constants.js";
import Api from "../components/Api.js";
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-42",
  headers: {
    authorization: "0c1a437a-6e52-4fdd-9796-28127f1dce6c",
    "Content-Type": "application/json",
  },
});

// экземпляр класса

const formProfileValidator = new FormValidator(
  validationData,
  formElementProfile
);
formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validationData, formElementCard);
formCardValidator.enableValidation();

const profileAvatarValidator = new FormValidator(validationData, profileAvatar);
profileAvatarValidator.enableValidation();

const popupWithPhoto = new PopupWithImage(photoPopup);

// функция создания карточек
//создание новой карточки
function createCard(item) {
  const card = new Card(
    item.owner,
    item.name,
    item.link,
    item._id,
    item.likes,
    userId,
    "#card",
    {
      handleCardClick: () => {
        const titleValue = item.name;
        const linkValue = item.link;
        const photoCaption = caption;
        const targetPhotoItem = photoItem;
        popupWithPhoto.open(
          titleValue,
          linkValue,
          photoCaption,
          targetPhotoItem
        );
      },
      deleteBtn: (cardId, CardEl) => {
        const submitAccess = new PopupWithSubmit(
          {
            handleDeleteCard: (cardId, cardEl) => {
              submitAccess.loader(true);
              api
                .deleteCard(cardId)
                .then(() => {
                  card.deleteCard();
                  submitAccess.close();
                })
                .catch((err) => {
                  console.log(err); // выведем ошибку в консоль
                })
                .finally(() => {
                  submitAccess.loader(false);
                });
            },
          },
          submitPopup
        );
        submitAccess.open(cardId, CardEl);
      },
      likeCard: (likeButton, cId) => {
        if (likeButton.classList.contains("element__like-button_active")) {
          return api
            .disLikeCard(cId)
            .then((data) => {
              card.likeCard(data);
            })
            .catch((err) => {
              console.log(err); // выведем ошибку в консоль
            });
        } else {
          return api
            .likeCard(cId)
            .then((data) => {
              card.likeCard(data);
            })
            .catch((err) => {
              console.log(err); // выведем ошибку в консоль
            });
        }
      },
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}
const defaultCardList = new Section((item) => {
  defaultCardList.addItem(createCard(item));
}, elementsContainer);
//слушатели открытия попапов

const userData = new UserInfo(profileName, profileJob, prAvatar);
let userId;
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userD, cards]) => {
    userData.setUserInfo(userD);
    userData.setUserId(userD._id);
    userData.setUserAva(userD.avatar);
    userId = userData.getUserId();
    defaultCardList.renderItems(cards);
  })

  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

function editButton() {
  popupProfileForm.open();
  const profileInfo = userData.getUserInf();
  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.about;
  formProfileValidator.resetValidation();
}
buttonEdit.addEventListener("click", editButton);

const popupProfileForm = new PopupWithForm(
  {
    handleSubmitForm: (evt) => {
      evt.preventDefault();
      popupProfileForm.loader(true);
      const user = popupProfileForm.getInputValues();
      return api
        .changeUserInfo(user)
        .then(() => {
          userData.setUserInfo(user);
          popupProfileForm.close();
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
          popupProfileForm.loader(false);
        });
    },
  },
  profilePopup
);
function avaChange() {
  profileAvatarValidator.resetValidation();
  avatarForm.open();
}
changeAva.addEventListener("click", avaChange);
const avatarForm = new PopupWithForm(
  {
    handleSubmitForm: (evt) => {
      evt.preventDefault();
      avatarForm.loader(true);
      const ava = avatarForm.getInputValues().avatar;
      return api
        .changeAvatar(ava)
        .then((data) => {
          userData.setUserAva(data.avatar);

          avatarForm.close();
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
          avatarForm.loader(false);
        });
    },
  },
  avatarPopup
);
function addButton() {
  // formElementCard.reset();

  formCardValidator.resetValidation();
  popupCardForm.open();
}
//добавление новой карточки
buttonAdd.addEventListener("click", addButton);
const popupCardForm = new PopupWithForm(
  {
    handleSubmitForm: (evt) => {
      evt.preventDefault();
      popupCardForm.loader(true);

      const formValue = popupCardForm.getInputValues();

      return api
        .newCard(formValue)
        .then((data) => {
          renderCard(data);
          popupCardForm.close();
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
          popupCardForm.loader(false);
        });
    },
  },
  cardPopup
);
function renderCard(item) {
  const cardElement = createCard(item);
  defaultCardList.addItem(cardElement);
}
