class FormValidator {
    constructor(form, errorMessages) {
        this._form = form;
        this._errorMessages = errorMessages;
    }

    _setEventListeners = () => {
        this._form.addEventListener('input', this._handlerInputForm, true);
    }

    initialization = () => {
        this._setEventListeners();
        const error = this._form.querySelectorAll('.error');
        this._error = error;
        this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
        const submit = this._form.querySelector('.button');
        this._submit = submit;
    }

    setSubmitButtonState = (state) => {
        if (state) {
            this._submit.removeAttribute('disabled');
            this._submit.classList.add('popup__button_activ');
        } else {
            this._submit.setAttribute('disabled', true);
            this._submit.classList.remove('popup__button_activ');
        }
    }

    _handlerInputForm = (event) => {
        this.isFieldValid(event.target);
        this.setSubmitButtonState(this._inputs.every(this.isValidate));
    }

    isFormValid = () => {
        let valid = true;
        this._inputs.forEach((input) => {
            if (!isFieldValid(input)) valid = false;
        });
        return valid;
    }

    isFieldValid = (input) => {
        const errorElem = this._form.querySelector(`#${input.id}-error`);
        const valid = this.isValidate(input);
        errorElem.textContent = input.validationMessage;
        return valid;
    }

    isValidate = (input) => {

        input.setCustomValidity("");

        if (input.validity.valueMissing) {
            input.setCustomValidity(this._errorMessages.empty);
            return false;
        }

        if (input.validity.tooShort || input.validity.tooLong) {
            input.setCustomValidity(this._errorMessages.wrongLength);
            return false;
        }

        if (input.validity.typeMismatch && input.type === 'url') {
            input.setCustomValidity(this._errorMessages.wrongUrl);
            return false;
        }
        return input.checkValidity();
    }

    deleteErrorMessege = () => {
        this._error.forEach(item => item.textContent = '')
    }
}