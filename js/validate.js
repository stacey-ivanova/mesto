// 6 спринт

// переменные попапа
const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');
const popupOverlay=document.querySelectorAll('.popup');

// переменная esc
const esc_key_code = 27;

// функция закрытия попапа по нажатию на оверлей
popupOverlay.forEach((popupItem) => {
  popupItem.addEventListener('click', function (evt) {
    if(!evt.target.closest(".popup__content")){
    closePopup(popupItem)};
  });
  document.addEventListener('keyup', function (KeyboardEvent) {
      if (event.keyCode === ESC_KEY_CODE) {
        closePopup(popupItem);
      }
    });
      }
)

// функция вывеведения ошибки инпута
function showInputError(formElement, formInput, errorMessage) {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add('popup__input_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('popup__input-error_active');
}

// функция скрытия ошибки инпута
const hideInputError = (formElement, formInput) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove('popup__input_type_error');
  formError.classList.remove('popup__input-error_active');
  formError.textContent = '';
};

// функция проверки валидности формы
const isValid = (formElement, formInput) => {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  }
  else {
    hideInputError(formElement, formInput);
  }
};

// функция проверки наличия ошибки ввода
const hasInvalidInput = (inputList) => {
    return inputList.some((formInput) => {
      return !formInput.validity.valid;
    })
}

// функция переключения состояния кнопки отправки
const toggleButtonState = (inputList, buttonSubmit) => {
    if (hasInvalidInput(inputList)) {
      buttonSubmit.classList.add('popup__submit-button_inactive');
    } else {
      buttonSubmit.classList.remove('popup__submit-button_inactive');
    }

}

// функция утсановки слушателей на инпуты
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonSubmit = formElement.querySelector('.popup__submit-button');

  toggleButtonState(inputList, buttonSubmit);
  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      isValid(formElement, formInput);
      toggleButtonState(inputList, buttonSubmit);
    });

  });
};

// функция включения валидации
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();
