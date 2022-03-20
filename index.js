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
//js для формы
let formElement = document.querySelector(".popup__form");
let nameInput = formElement.querySelector(".popup__profile-name");
let jobInput = formElement.querySelector(".popup__profile-profession");

function formSubmitHandler(evt) {
  evt.preventDefault();
  let nameValue = nameInput.value;
  let jobValue = jobInput.value;
  let profileName = document.querySelector(".profile__title");
  let profileJob = document.querySelector(".profile__subtitle");

  profileName.textContent = nameValue;
  profileJob.textContent = jobValue;
}

formElement.addEventListener("submit", formSubmitHandler);
formElement.addEventListener("submit", closePopup);
