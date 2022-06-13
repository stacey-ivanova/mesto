// объект карточки
export default class Card {
  constructor(
    ownerid,
    titleValue,
    linkValue,
    cardId,
    likes,
    userId,
    cardSelector,
    { handleCardClick, deleteBtn, likeCard, dislikeCard }
  ) {
    this._titleValue = titleValue;
    this._linkValue = linkValue;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._deleteBtn = deleteBtn;
    this._userInf = userId;
    this.id = ownerid._id;
    this.cardId = cardId;
    this.likes = likes;
    this.like = likeCard;
    this.dislike = dislikeCard;
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
    this._likeButton = this._element.querySelector(".element__like-button");
    this._trashButton = this._element.querySelector(".element__trash");
    this._likeNumber = this._element.querySelector(".element__like-number");
    this._cardPhoto = this._element.querySelector(".element__photo");
    this._setEventListeners();
    this._element.querySelector(".element__text").textContent =
      this._titleValue;
    this._cardPhoto.src = this._linkValue;
    this._cardPhoto.alt = this._titleValue;
    this.likes.forEach((like) => {
      if (like._id == this._userInf) {
        this._likeButton.classList.add("element__like-button_active");
      }
    });

    this._likeNumber.textContent = this.likes.length;

    if (this.id != this._userInf) {
      this._trashButton.classList.add("element_trash-inactive");
    }
    return this._element;
  }

  _setEventListeners() {
    this._trashButton.addEventListener("click", () => {
      this._deleteBtn(this.cardId, this._element);
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
    if (this._likeButton.classList.contains("element__like-button_active")) {
      this.dislike(this.cardId)
        .then((data) => {
          this._likeNumber.textContent = data.likes.length;
          this._likeButton.classList.remove("element__like-button_active");
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    } else {
      this.like(this.cardId)
        .then((data) => {
          this._likeNumber.textContent = data.likes.length;
          this._likeButton.classList.add("element__like-button_active");
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
    // this._likeButton.classList.toggle("element__like-button_active");
  }

  // метод удаления карточек
  _deleteCard() {
    this._element.closest(".element").remove();
  }
}
