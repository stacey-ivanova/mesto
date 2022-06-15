export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._closeButton = this._popupSelector.querySelector(
      ".popup__close-button"
    );
    this.buttonSrch = this._popupSelector.querySelector(
      ".popup__submit-button"
    );
    this._closes = this.close.bind(this);
  }
  open() {
    this._popupSelector.classList.add("popup_opened");
    this._setEventListeners();
  }
  loader(isload) {
    if (isload) {
      this.buttonSrch.textContent = "Сохранение...";
    } else {
      this.buttonSrch.textContent = "Сохранить";
    }
  }
  close() {
    this._popupSelector.classList.remove("popup_opened");
    this._removeEventListeners();
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _closeByOverlay = (evt) => {
    if (!evt.target.closest(".popup__content")) {
      this.close();
    }
  };

  _setEventListeners() {
    this._popupSelector.addEventListener("mousedown", this._closeByOverlay);
    document.addEventListener("keydown", this._handleEscClose);
    this._closeButton.addEventListener("click", this._closes);
  }
  _removeEventListeners() {
    this._popupSelector.removeEventListener("mousedown", this._closeByOverlay);
    document.removeEventListener("keydown", this._handleEscClose);
    this._closeButton.removeEventListener("click", this._closes);
  }
}
