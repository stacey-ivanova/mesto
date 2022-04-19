// 6 спринт

// объект валидации
const validationData = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// функция вывеведения ошибки инпута
function showInputError(formElement, formInput, errorMessage, validation) {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.add(validation.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(validation.errorClass);
}

// функция скрытия ошибки инпута
const hideInputError = (formElement, formInput, validation) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove(validation.inputErrorClass);
  formError.classList.remove(validation.errorClass);
  formError.textContent = "";
};

// функция проверки валидности формы
const isValid = (formElement, formInput, validation) => {
  if (!formInput.validity.valid) {
    showInputError(
      formElement,
      formInput,
      formInput.validationMessage,
      validation
    );
  } else {
    hideInputError(formElement, formInput, validation);
  }
};

// функция проверки наличия ошибки ввода
const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  });
};

// функция переключения состояния кнопки отправки
const toggleButtonState = (inputList, buttonSubmit, validation) => {
  if (hasInvalidInput(inputList)) {
    buttonSubmit.classList.add(validation.inactiveButtonClass);
    buttonSubmit.disabled = true;
  } else {
    buttonSubmit.classList.remove(validation.inactiveButtonClass);
    buttonSubmit.disabled = false;
  }
};
// функция переключения состояния кнопки при открытии/закрытии формы
function toggleButtonStateOnStart(item, validation) {
  const inputList = Array.from(item.querySelectorAll(validation.inputSelector));
  const buttonSubmit = item.querySelector(validation.submitButtonSelector);
  toggleButtonState(inputList, buttonSubmit, validation);
}

// функция установки слушателей на инпуты
const setEventListeners = (formElement, validation) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validation.inputSelector)
  );
  const buttonSubmit = formElement.querySelector(
    validation.submitButtonSelector
  );

  toggleButtonState(inputList, buttonSubmit, validation);
  inputList.forEach((formInput) => {
    formInput.addEventListener("input", () => {
      isValid(formElement, formInput, validation);
      toggleButtonState(inputList, buttonSubmit, validation);
    });
  });
};

// функция включения валидации
const enableValidation = (validation) => {
  const formList = Array.from(
    document.querySelectorAll(validation.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validation);
  });
};

enableValidation(validationData);

// const setEventListeners = (formElement, validationData) => {
//   const inputList = Array.from(
//     formElement.querySelectorAll(validationData.inputSelector)
//   );
//   const buttonSubmit = formElement.querySelector(
//     validationData.submitButtonSelector
//   );

//   toggleButtonState(inputList, buttonSubmit);
//   inputList.forEach((formInput) => {
//     formInput.addEventListener("input", () => {
//       isValid(formElement, formInput);
//       toggleButtonState(inputList, buttonSubmit);
//     });
//   });
// };

// // функция включения валидации
// const enableValidation = (validationData) => {
//   const formList = Array.from(
//     document.querySelectorAll(validationData.formSelector)
//   );
//   formList.forEach((formElement) => {
//     formElement.addEventListener("submit", (evt) => {
//       evt.preventDefault();
//     });
//     setEventListeners(formElement, validationData);
//   });
// };

// enableValidation(validation);
