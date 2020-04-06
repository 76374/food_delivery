import React from 'react';
import Popup from '../Popup/Popup';

const ErrorPopup = (props) => {
  const { message } = props;
  const onClick = () => {
    if (props.onOkClicked) {
      props.onOkClicked();
    }
  };
  return (
    <Popup content={(
      <>
        <p>{message}</p>
        <button onClick={onClick} type="button">Зрозумiло...</button>
      </>
    )}
    />
  );
};

export default ErrorPopup;
