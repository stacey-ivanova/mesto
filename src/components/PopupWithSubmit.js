import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleDeleteCard }, popupSelector) {
    super(popupSelector);
    this._handleDeleteCard = handleDeleteCard;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }
  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._handleDeleteCard(this.cardId, this.cardElement);
  }
  _setEventListeners() {
    this.buttonSrch.addEventListener("click", this._formSubmitHandler);

    super._setEventListeners();
  }

  _removeEventListeners() {
    this.buttonSrch.removeEventListener("click", this._formSubmitHandler);
    super._removeEventListeners();
  }
  open(id, element) {
    this.cardId = id;
    this.cardElement = element;
    super.open();
  }
}
