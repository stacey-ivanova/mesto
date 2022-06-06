const karachaevskImage = new URL(
  "../images/kirill-pershin-1088404-unsplash.png",
  import.meta.url
);
const elbrusImage = new URL(
  "../images/kirill-pershin-1404681-unsplash.png",
  import.meta.url
);
const dombayImage = new URL(
  "../images/kirill-pershin-1556355-unsplash.png",
  import.meta.url
);

// переменные попапа фото
export const photoPopup = document.querySelector(".popup_type_photo");

export const photoItem = photoPopup.querySelector(".popup__photo");
export const caption = photoPopup.querySelector(".popup__photo-caption");

// переменные попапа
export const profilePopup = document.querySelector(".popup_type_profile");
export const cardPopup = document.querySelector(".popup_type_card");
export const buttonEdit = document.querySelector(".profile__edit-button");
export const buttonAdd = document.querySelector(".profile__add-button");
export const closeButton = document.querySelector(".popup__close-button");

// переменные формы заполнения попапа профиля
export const formElementProfile = profilePopup.querySelector(
  ".popup__form_type_profile"
);
export const nameInput = formElementProfile.querySelector(
  ".popup__input_type_name"
);
export const jobInput = formElementProfile.querySelector(
  ".popup__input_type_job"
);
export const profileName = document.querySelector(".profile__title");
export const profileJob = document.querySelector(".profile__subtitle");

// переменные формы заполнения попапа новой карточки
export const formElementCard = cardPopup.querySelector(
  ".popup__form_type_card"
);
export const titleInput = formElementCard.querySelector(
  ".popup__input_type_title"
);
export const linkInput = formElementCard.querySelector(
  ".popup__input_type_link"
);
export const cardTitle = document.querySelector(".element__text");

// переменные исходных и новых карточек
export const elementsContainer = document.querySelector(".elements");

// объект валидации
export const validationData = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// массив карточек
export const cardsInitial = [
  {
    title: "Карачаевск",
    link: karachaevskImage,
    alt: "фотография Карачаевска",
  },
  {
    title: "Гора Эльбрус",
    link: elbrusImage,
    alt: "фотография Эльбруса",
  },
  {
    title: "Домбай",
    link: dombayImage,
    alt: "фотография Домбая",
  },
  {
    title: "Гора Эльбрус",
    link: elbrusImage,
    alt: "фотография Эльбруса",
  },
  {
    title: "Домбай",
    link: dombayImage,
    alt: "фотография Домбая",
  },
  {
    title: "Карачаево-Черкессия",
    link: karachaevskImage,
    alt: "фотография Карачаево-Черкессии",
  },
];
