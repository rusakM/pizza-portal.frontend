import React, { useRef } from 'react';
import './form-popup.styles.scss';

const FormPopup = () => {
    const popupRef = useRef();
    return (
        <aside class="form-popup" ref={popupRef}>
            <div class="form-popup-container">
                <p class="form-popup-message">Wiadomość została wysłana</p>
                <span
                    class="form-popup-confirm-btn btn"
                    onClick={() => {
                        popupRef.current.style.display = 'none';
                    }}
                >
                    OK
                </span>
            </div>
        </aside>
    );
};

export default FormPopup;
