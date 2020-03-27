import React from 'react';
import Popup from '../Popup/Popup'

const ErrorPopup = props => {
    const onClick = () => {
        if (props.onOkClicked) {
            props.onOkClicked();
        }
    }
    return (
        <Popup children={
            <React.Fragment>
                <p>{props.message}</p>
                <button onClick={onClick}>Зрозумiло...</button>
            </React.Fragment>
        } />
    );
};

export default ErrorPopup;