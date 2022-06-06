import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(titleValue, linkValue, caption, photoItem) {
    photoItem.src = linkValue;
    caption.textContent = titleValue;
    photoItem.alt = titleValue;
    super.open();
  }
}
