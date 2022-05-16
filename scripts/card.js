import { openPopup, closePopup } from "./index.js";

// переменные попапа фото
export const photoPopup = document.querySelector(".popup_type_photo");
const photoCloseButton = photoPopup.querySelector(".popup__close-button");
const photoItem = photoPopup.querySelector(".popup__photo");
const caption = photoPopup.querySelector(".popup__photo-caption");

// объект карточки
export class Card {
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
