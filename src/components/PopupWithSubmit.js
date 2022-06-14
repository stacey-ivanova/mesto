import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleDeleteCard }, popupSelector) {
    super(popupSelector);
    this._handleDeleteCard = handleDeleteCard.bind(this);
    this.sendbutton = this._popupSelector.querySelector(
      ".popup__submit-button"
    );
  }

  _setEventListeners() {
    this.sendbutton.addEventListener(
      "click",
      this._handleDeleteCard(this.cardId, this.cardElement)
    );

    super._setEventListeners();
  }

  _removeEventListeners() {
    this.sendbutton.removeEventListener(
      "click",
      this._handleDeleteCard(this.cardId, this.cardElement)
    );
    super._removeEventListeners();
  }
  open(id, element) {
    this.cardId = id;
    this.cardElement = element;
    super.open();
  }
}
