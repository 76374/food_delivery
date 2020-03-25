import React from 'react';
import styles from './ErrorPopup.module.css';

const ErrorPopup = props => {
    const onClick = () => {
        if (props.onOkClicked) {
            props.onOkClicked();
        }
    }
    return (
        <div className={styles.Background}>
            <div className={styles.Popup}>
                <p>{props.message}</p>
                <button onClick={onClick}>Зрозумiло...</button>
            </div>
        </div>
    );
};

export default ErrorPopup;