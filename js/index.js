// переменные попапа
const popupProfile = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_card');
const popupPhoto = document.querySelector('.popup_type_photo');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const profileCloseButton = popupProfile.querySelector('.popup__close-button');
const cardCloseButton = popupCard.querySelector('.popup__close-button');
const photoCloseButton = popupPhoto.querySelector('.popup__close-button');

// переменные формы заполнения попапа профиля
const formElementProfile = popupProfile.querySelector('.popup__form');
const nameInput = formElementProfile.querySelector('.popup__input_type_name');
const jobInput = formElementProfile.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

// переменные формы заполнения попапа новой карточки
const formElementCard = popupCard.querySelector('.popup__form_type_place');
const titleInput = formElementCard.querySelector('.popup__input_type_title');
const linkInput = formElementCard.querySelector('.popup__input_type_link');
const cardTitle = document.querySelector('.element__text');

// переменные исходных и новых карточек
const elementsContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content;
// const deleteButton = document.querySelector('.element__trash');
// const likeButton = document.querySelector('.element__like');

// переменные попапа фото
// const photoItem = popupPhoto.querySelector('.popup__photo');
// const caption = popupPhoto.querySelector('.popup__photo-caption');

// переменная enter
const enter_key_code = 13;

// массив карточек
const initialCards = [
  {
    name: 'Карачаевск',
    link: './blocks/element/__photo/images/kirill-pershin-1088404-unsplash.png',
    alt: 'фотография Карачаевска'
  },
  {
    name: 'Гора Эльбрус',
    link: './blocks/element/__photo/images/kirill-pershin-1404681-unsplash.png',
    alt: 'фотография Эльбруса'
  },
  {
    name: 'Домбай',
    link: './blocks/element/__photo/images/kirill-pershin-1556355-unsplash.png',
    alt: 'фотография Домбая'
  },
  {
    name: 'Гора Эльбрус',
    link: './blocks/element/__photo/images/kirill-pershin-1404681-unsplash.png',
    alt: 'фотография Эльбруса'
  },
  {
    name: 'Домбай',
    link: './blocks/element/__photo/images/kirill-pershin-1556355-unsplash.png',
    alt: 'фотография Домбая'
  },
  {
    name: 'Карачаево-Черкессия',
    link: './blocks/element/__photo/images/kirill-pershin-1088404-unsplash.png',
    alt: 'фотография Карачаево-Черкессии'
  }
];

// функия открытия попапа
function openPopup(item) {
  item.classList.add('popup_opened');
};

function openPopupProfile (item) {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(item);
  };

function openPopupPhoto (item, photo, photoCaption) {
  popupPhoto.querySelector('.popup__photo').src = photo;
  popupPhoto.querySelector('.popup__photo-caption').textContent = photoCaption;
  popupPhoto.querySelector('.popup__photo').alt = photoCaption;
  openPopup(item);
  }

// функция закрытия попапа
function closePopup(item) {
  // item.classList.remove('popup_opened');
  item.closest('.popup').classList.remove('popup_opened');

}

// функция заполнения и отправки попапа профиля
function formSubmitHandlerProfile(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
  closePopup(popupProfile);
}

// функция заполнения и отправки попапа карточек
function formSubmitHandlerCard(evt) {
  evt.preventDefault();
  const titleValue = titleInput.value;
  const linkValue = linkInput.value;

  renderCard(titleValue, linkValue);
  closePopup(popupCard);
  formElementCard.reset();
}

// функция создания карточек
function createCard(titleValue, linkValue) {
  const cardElement = cardTemplate.querySelector('.card-item').cloneNode(true);
  cardElement.querySelector('.element__text').textContent = titleValue;
  const cardPhoto = cardElement.querySelector('.element__photo');
  cardPhoto.src = linkValue;
  cardPhoto.alt = titleValue;

  cardElement.querySelector('.element__trash').addEventListener('click', deleteCard);
  cardElement.querySelector('.element__like').addEventListener('click', likeCard);
  cardElement.querySelector('.element__photo').addEventListener('click', function () {openPopupPhoto(popupPhoto, linkValue, titleValue);});
  photoCloseButton.addEventListener('click', function () {closePopup(popupPhoto);});
  return cardElement;
};

 // функция отрисовки карточек
  function renderCard(titleValue, linkValue){
    const renderedCard = createCard(titleValue, linkValue);
    elementsContainer.prepend(renderedCard);
  };

// функция лайка карточек
function likeCard(evt) {
  evt.target.classList.toggle('element__like_active');
  }

// функция удаления карточек
function deleteCard(evt) {
  evt.target.closest('.card-item').remove();
}

// функция добавления карточек при загурзке
initialCards.forEach(function (card) {
  renderCard(card.name, card.link)
});

//слушатели открытия попапов
buttonEdit.addEventListener('click', function () {openPopupProfile(popupProfile);});
buttonAdd.addEventListener('click', function () {openPopup(popupCard);});

//слушатели закрытия попапов
profileCloseButton.addEventListener('click', function () {closePopup(popupProfile);});
cardCloseButton.addEventListener('click', function () {closePopup(popupCard);});

//слушатели отправки формы попапа профиля
formElementProfile.addEventListener('submit', formSubmitHandlerProfile);

//слушатели отправки формы попапа карточек
formElementCard.addEventListener('submit', formSubmitHandlerCard);

// ЛИШНЕЕ

// let ESC_KEY_CODE = 27;
// document.addEventListener('keyup', function (KeyboardEvent) {
//   if (event.keyCode === ESC_KEY_CODE) {
//     closePopup();
//   }
// });

// initialCards.forEach(function (nameValue, linkValue) {
//   const cardTemplate = document.querySelector('#card').content;
//   const cardElement = cardTemplate.querySelector('.card-item').cloneNode(true);
//   cardElement.querySelector('.element__text').textContent = item.name;
//   cardElement.querySelector('.element__photo').src = item.link;
//   cardElement.querySelector('.element__photo').alt = item.alt;
//   cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
//     evt.target.classList.toggle('element__like:active')
//     });

//   elementsContainer.append(cardElement);
// });

//функция заполнения и отправки попапа карточек
// function formSubmitHandlerCard(evt) {
//   evt.preventDefault();
//   const titleValue = titleInput.value;
//   const linkValue = linkInput.value;

//   cardTitle.textContent = titleValue;
//   cardPhoto.src = linkValue;
//   cardPhoto.alt = titleValue;
//   closePopup(evt)
// }

// cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
//   evt.target.classList.toggle('element__like:active')
//   });

//   for (let i=0; i < deleteButton.length; i++) {
//       deleteButton[i].addEventListener('click', function () {
//       const cardElement = deleteButton.closest('.card-item');
//       cardElement.remove();})
//     };

// function creatPhotoPopup(photoSrc,photoCaption){
//   return function( evt ){
//     evt.querySelector('.popup__photo').src=photoSrc;
//     evt.querySelector('.popup__photo-caption').textContent=photoCaption;
//     openPopup(popupPhoto);
//       }
// }

// функия открытия попапа
// function openPopup(item,photoSrc,photoCaption) {
//   item.classList.add('popup_opened');
//   if (item === popupProfile) {
//     nameInput.value = profileName.textContent;
//     jobInput.value = profileJob.textContent;
//   }
//   else if (item === popupPhoto) {
//     item.querySelector('.popup__photo').src=photoSrc;
// item.querySelector('.popup__photo-caption').textContent=photoCaption;
//   }
// }
// photoItem.src = document.querySelector('.element__photo').src
//     caption.textContent = document.querySelector('.element__text').textContent

//слушатель отправки формы по enter
// document.addEventListener('keyup', function (KeyboardEvent) {
//   if (event.keyCode === enter_key_code) {
//     formSubmitHandlerCard();
//   }
// });
