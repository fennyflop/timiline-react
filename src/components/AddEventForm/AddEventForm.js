import './AddEventForm.css';
import { useEffect, useState } from 'react';

function AddEventForm() {
    const [day, setDay] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();

    const [isDayValid, setIsDayValid] = useState(false);
    const [isMonthValid, setIsMonthValid] = useState(false);
    const [isYearValid, setIsYearValid] = useState(false);

    const [errorMessage, setErrorMessage] = useState('Введите корректную дату.');
    const [wellMessage, setWellMessage] = useState('');

    function handleSetDay(evt) {
        setDay(evt.target.value);
        setIsDayValid(evt.target.validity.valid);
    };

    function handleSetMonth(evt) {
        setMonth(evt.target.value);
        setIsMonthValid(evt.target.validity.valid);
    };

    function handleSetYear(evt) {
        setYear(evt.target.value);
        setIsYearValid(evt.target.validity.valid);
    };

    useEffect(() => {
        const date = new Date(year, (+month - 1), day)
        const isValid = (Boolean(+date) && date.getDate() == day)
        if (!isValid) {
            setErrorMessage('Введите корректную дату.');
            setWellMessage('');
        } else {
            setErrorMessage('');
            setWellMessage('😃 Всё хорошо!');
        }
    }, [day, month, year])

    return (
        <form className="form" noValidate>
            <div className="form__container">
                <h2 className="form__title">Укажите дату</h2>
                <fieldset className="form__fieldset">
                    <input defaultValue="0" className={`form__date ${isDayValid ? '' : 'form__date-error'}`} id="day" type="number" onChange={handleSetDay} min={1} max={31} placeholder="День" required />
                    <input defaultValue="0" className={`form__date ${isMonthValid ? '' : 'form__date-error'}`} id="month" type="number" onChange={handleSetMonth} min={1} max={31} placeholder="Месяц" required />
                    <input defaultValue="0" className={`form__date ${isYearValid ? '' : 'form__date-error'}`} id="year" type="number" onChange={handleSetYear} placeholder="Год" required />
                </fieldset>
            </div>
            <p className="form__error">{errorMessage}</p>
            <p className="form__well">{wellMessage}</p>
            <button className="form__submit" type="submit">Продолжить -></button>
        </form>
    );
}

export default AddEventForm;