export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._closeButton = this._popupSelector.querySelector(
      ".popup__close-button"
    );
  }
  open() {
    this._popupSelector.classList.add("popup_opened");
    this._setEventListeners();
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
    this._closeButton.addEventListener("click", () => this.close());
  }
  _removeEventListeners() {
    this._popupSelector.removeEventListener("mousedown", this._closeByOverlay);
    document.removeEventListener("keydown", this._handleEscClose);
    this._closeButton.removeEventListener("click", () => this.close());
  }
}
