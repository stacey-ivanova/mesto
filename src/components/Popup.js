export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }
  open() {
    this._popupSelector.classList.add("popup_opened");
    this._setEventListeners();
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
    this._popupSelector.removeEventListener("mousedown", this._closeByOverlay);
    this._popupSelector.removeEventListener("keydown", this._handleEscClose);
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
    const closeButton = this._popupSelector.querySelector(
      ".popup__close-button"
    );
    closeButton.addEventListener("click", () => this.close());
  }
}
