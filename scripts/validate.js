// объект валидации
export const validationData = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-button",
  inactiveButtonClass: "popup__submit-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

export class FormValidator {
  constructor(validationData, formElement) {
    this._inputSelector = validationData.inputSelector;
    this._submitButtonSelector = validationData.submitButtonSelector;
    this._inactiveButtonClass = validationData.inactiveButtonClass;
    this._inputErrorClass = validationData.inputErrorClass;
    this._errorClass = validationData.errorClass;
    this._formElement = formElement;
  }

  // функция установки слушателей на инпуты
  _setEventListeners = () => {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonSubmit = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._toggleButtonState();

    this._inputList.forEach((formInput) => {
      formInput.addEventListener("input", () => {
        this._isValid(formInput);
        this._toggleButtonState();
      });
    });
  };

  // функция переключения состояния кнопки отправки
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._buttonSubmit.classList.add(this._inactiveButtonClass);
      this._buttonSubmit.disabled = true;
    } else {
      this._buttonSubmit.classList.remove(this._inactiveButtonClass);
      this._buttonSubmit.disabled = false;
    }
  };
  // функция переключения состояния кнопки при открытии/закрытии формы
  _toggleButtonStateOnStart = () => {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonSubmit = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._toggleButtonState();
  };

  // функция проверки наличия ошибки ввода
  _hasInvalidInput = () => {
    return this._inputList.some((formInput) => {
      return !formInput.validity.valid;
    });
  };

  // функция проверки валидности формы
  _isValid = (formInput) => {
    if (!formInput.validity.valid) {
      this._showInputError(formInput);
    } else {
      this._hideInputError(formInput);
    }
  };

  // функция вывеведения ошибки инпута
  _showInputError = (formInput) => {
    this._formError = this._formElement.querySelector(`.${formInput.id}-error`);
    console.log(formInput.id);
    console.log(this._formError);
    formInput.classList.add(this._inputErrorClass);
    this._formError.textContent = formInput.validationMessage;
    this._formError.classList.add(this._errorClass);
  };

  // функция скрытия ошибки инпута
  _hideInputError = (formInput) => {
    this._formError = this._formElement.querySelector(`.${formInput.id}-error`);
    formInput.classList.remove(this._inputErrorClass);
    this._formError.classList.remove(this._errorClass);
    this._formError.textContent = "";
  };

  // функция включения валидации
  enableValidation = () => {
    this._setEventListeners();
  };
}
