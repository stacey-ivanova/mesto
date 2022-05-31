import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleSubmitForm }, popupSelector) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._inputs = this._popupSelector.querySelectorAll(".popup__input");
    this._form = this._popupSelector.querySelector(".popup__form");
  }
  _getInputValues() {
    this._inputsValue = {};
    this._inputs.forEach((input) => {
      this._inputsValue[input.name] = input.value;
    });
    return this._inputsValue;
  }

  _setEventListeners() {
    this._popupSelector.addEventListener("submit", this._handleSubmitForm);
    super._setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
