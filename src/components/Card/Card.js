import './Card.css';
import { useState } from 'react';

function Card() {

    const [mainOpened, setMainOpened] = useState(false);
    const [buttonSymbol, setButtonSymbol] = useState('+');

    function handleMainOpen() {
        setMainOpened(!mainOpened);
        if (buttonSymbol === '+') {
            setButtonSymbol('-');
        } else {
            setButtonSymbol('+');
        }
    }

    return (
        <>
            <div className="card">
                <header className="card__header">
                    <p class="card__date">1679 г.</p>
                    <div class="card__information">
                        <p class="card__brief">Тут произошло такое событие!</p>
                        <button class="card__button" onClick={handleMainOpen}>{buttonSymbol}</button>
                    </div>
                </header>
            </div>
            <main className={`card__main ${mainOpened ? 'card__main_opened' : ''}`}>
                <p className="card__details">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
            </main>
        </>
    );
}

export default Card;