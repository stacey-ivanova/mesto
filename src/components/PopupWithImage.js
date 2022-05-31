import Popup from "./Popup.js";
import { caption, photoItem } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(titleValue, linkValue) {
    photoItem.src = linkValue;
    caption.textContent = titleValue;
    photoItem.alt = titleValue;
    super.open();
  }
}
