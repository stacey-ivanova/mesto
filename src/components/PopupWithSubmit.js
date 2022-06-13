import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleDeleteCard }) {
    super(popupSelector);
    this._handleDeleteCard = handleDeleteCard;
  }

  _setEventListeners() {
    this._popupSelector.addEventListener("click", () => {
      this._handleDeleteCard(this.cardId, this.cardElement);
      this.close();
    });
    super._setEventListeners();
  }

  _removeEventListeners() {
    this._popupSelector.removeEventListener("click", () => {
      this._handleDeleteCard(this.cardId, this.cardElement);
      this.close();
    });
    super._removeEventListeners();
  }
  open(id, element) {
    this.cardId = id;
    this.cardElement = element;
    super.open();
  }
}
