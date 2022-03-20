let popupElement = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");
let closeButton = popupElement.querySelector(".popup__close-button");

function openPopup() {
  popupElement.classList.add("popup_opened");
}

function closePopup() {
  popupElement.classList.remove("popup_opened");
}

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);

let ESC_KEY_CODE = 27;
document.addEventListener("keyup", function (KeyboardEvent) {
  if (event.keyCode === ESC_KEY_CODE) {
    closePopup();
  }
});
