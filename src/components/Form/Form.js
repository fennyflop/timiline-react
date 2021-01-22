import './Form.css';
import DateValidator from '../DateValidator/DateValidator';
import { useEffect, useState } from 'react';

//       this._inputSelector = selectors.inputSelector;
//       this._submitButtonSelector = selectors.submitButtonSelector;
//       this._inactiveButtonClass = selectors.inactiveButtonClass;
//       this._inputErrorClass = selectors.inputErrorClass;
//       this._errorClass = selectors.errorClass;
//       this._formElement = formElement;
//       this._buttonElement = this._formElement.querySelector(
//         this._submitButtonSelector
//       );
//       this._inputList = Array.from(
//         this._formElement.querySelectorAll(this._inputSelector)
//       );
//     }
//     _showInputError(inputElement, errorMessage) {
//       const errorElement = this._formElement.querySelector(
//         `#${inputElement.id}-error`
//       );
//       errorElement.textContent = errorMessage;
//       errorElement.classList.add(`${this._errorClass}`);
//     }
//     _hideInputError(inputElement) {
//       const errorElement = this._formElement.querySelector(
//         `#${inputElement.id}-error`
//       );
//       errorElement.textContent = "";
//       errorElement.classList.remove(`${this._errorClass}`);
//       inputElement.classList.remove(this._inputErrorClass);
//     }
//     _setEventListeners() {
//       this._handleButtonState();
//       this._inputList.forEach(inputElement => {
//         inputElement.addEventListener("input", () => {
//           this._checkInputValidity(inputElement);
//           this._handleButtonState();
//         });
//       });
//     }
//     _hasInvalidInput() {
//       return this._inputList.some(inputElement => !inputElement.validity.valid);
//     }

//     _handleButtonState() {
//       if (this._hasInvalidInput()) {
//         this._makeButtonInactive();
//       } else {
//         this._makeButtonActive();
//       }
//     }

//     _makeButtonActive() {
//       this._buttonElement.classList.remove(`${this._inactiveButtonClass}`);
//       this._buttonElement.removeAttribute("disabled", true);
//     }

//     _makeButtonInactive() {
//       this._buttonElement.classList.add(`${this._inactiveButtonClass}`);
//       this._buttonElement.setAttribute("disabled", true);
//     }

//     _checkInputValidity(inputElement) {
//       const isInputNotValid = !inputElement.validity.valid;
//       if (isInputNotValid) {
//         let errorMessage = inputElement.validationMessage;
//         inputElement.classList.add(`${this._inputErrorClass}`);
//         this._showInputError(inputElement, errorMessage);
//       } else {
//         inputElement.classList.remove(`${this._inputErrorClass}`);
//         this._hideInputError(inputElement);
//       }
//     }
//     cleanErrors() {
//       this._makeButtonInactive();
//       this._inputList.forEach(inputElement => {
//         this._hideInputError(inputElement);
//       });
//     }
//     enableValidation() {
//       this._formElement.addEventListener("submit", evt => {
//         evt.preventDefault();
//       });
//       this._setEventListeners();
//     }
//   }

function Form() {

    const [dayValue, setDayValue] = useState(0);
    const [monthValue, setMonthValue] = useState(0);
    const [yearValue, setYearValue] = useState(0);
    const [briefValue, setBriefValue] = useState('');
    const [detailsValue, setDetailsValue] = useState('');
    const [isValidDate, setIsValidDate] = useState(false);
    const [isValidBrief, setIsValidBrief] = useState(false);
    const [isValidDetails, setIsValidDetails] = useState(false);

    function handleDayChange(event) {
        setDayValue(+event.target.value);
    }

    function handleMonthChange(event) {
        setMonthValue(+event.target.value);
    }
    function handleYearChange(event) {
        setYearValue(+event.target.value);
    }

    function handleBriefChange(event) {
        setBriefValue(event.target.value);
    }
    function handleDetailsChange(event) {
        setDetailsValue(event.target.value);
    }

    useEffect(() => {
        if (briefValue.length > 2 && briefValue.length <= 30) {
            setIsValidBrief(true);
        } else {
            setIsValidBrief(false);
        }
        if (detailsValue.length > 2) {
            setIsValidDetails(true);
        } else {
            setIsValidDetails(false);
        }
    }, [briefValue, detailsValue])

    useEffect(() => {
        const validator = new DateValidator(dayValue, monthValue, yearValue);
        if (validator.inputsValid(dayValue, monthValue)) {
            setIsValidDate(validator.isDateValid(dayValue, monthValue, yearValue));
        } else {
            setIsValidDate(false);
        }
    }, [dayValue, monthValue, yearValue]);

    return (
        <>
            <form className="form">
                <div className="form__container">
                    <div className="form__left">
                        <fieldset className="form__fieldset">
                            <input className={`form__item ${isValidDate ? '' : 'form__item-invalid'}`} type="number" minLength="1" maxlength="31" placeholder="День" onChange={handleDayChange} />
                            <input className={`form__item ${isValidDate ? '' : 'form__item-invalid'}`} type="number" minLength="1" maxlength="12" placeholder="Месяц" onChange={handleMonthChange} />
                            <input className={`form__item ${isValidDate ? '' : 'form__item-invalid'}`} type="number" placeholder="Год" onChange={handleYearChange} />
                        </fieldset>
                        <p className={`form__input-error ${isValidDate ? '' : 'form__input-error_open'}`}>&#33; Неправильная дата</p>
                        <p className={`form__input-error ${isValidBrief ? '' : 'form__input-error_open'}`}>&#33; Неверное краткое описание</p>
                        <p className={`form__input-error ${isValidDetails ? '' : 'form__input-error_open'}`}>&#33; Неверный подробный текст</p>
                        <p className={`form__good ${isValidDetails && isValidBrief && isValidDetails ? 'form__good-opened' : ''}`}>😀 Всё отлично!</p>
                        <input className={`form__input ${isValidBrief ? '' : 'form__input-invalid'}`} placeholder="Краткое описание" onChange={handleBriefChange} />
                    </div>
                    <div className="form__right">
                        <textarea className={`form__input form__input-big ${isValidDetails ? '' : 'form__input-big_invalid'}`} placeholder="Подробный текст" onChange={handleDetailsChange} />
                    </div>
                </div>
                <button type="submit" className="form__submit" disabled={!isValidDate}>+</button>
            </form>
        </>
    );
}

export default Form;