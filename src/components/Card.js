// объект карточки
export default class Card {
  constructor(titleValue, linkValue, cardSelector, { handleCardClick }) {
    this._titleValue = titleValue;
    this._linkValue = linkValue;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._likeButton = this._element.querySelector(".element__like");
    this._trashButton = this._element.querySelector(".element__trash");
    this._cardPhoto = this._element.querySelector(".element__photo");
    this._setEventListeners();
    this._element.querySelector(".element__text").textContent =
      this._titleValue;
    this._cardPhoto.src = this._linkValue;
    this._cardPhoto.alt = this._titleValue;
    return this._element;
  }

  _setEventListeners() {
    this._trashButton.addEventListener("click", () => {
      this._deleteCard();
    });

    this._likeButton.addEventListener("click", () => {
      this._likeCard();
    });

    this._cardPhoto.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  // метод лайка карточек
  _likeCard() {
    this._likeButton.classList.toggle("element__like_active");
  }

  // метод удаления карточек
  _deleteCard() {
    this._element.closest(".element").remove();
  }
}
