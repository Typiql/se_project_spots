const showInputError = (formElement, inputElement, errorMessage) => {
  const errorMessageElement = document.querySelector(`#${inputElement.id}-error`);
  errorMessageElement.textContent = errorMessage;
  inputElement.classList.add('modal__input_error');
}

const hideInputError = (formElement, inputElement, errorMessage) => {
  const errorMessageElement = document.querySelector(`#${inputElement.id}-error`);
  errorMessageElement.textContent = "";
  inputElement.classList.remove('modal__input_error');
}

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage); }
    else {
      hideInputError(formElement, inputElement, inputElement.validationMessage);
    }
  };

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(`modal__submit-btn_inactive`);
    buttonElement.disabled = true; }
    else {
      buttonElement.classList.remove(`modal__submit-btn_inactive`);
      buttonElement.disabled = false;
    }
  };

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(`.modal__input`));
  const buttonElement = formElement.querySelector(`.modal__submit-btn`);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  formList = Array.from(document.querySelectorAll(`.modal__form`));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation();