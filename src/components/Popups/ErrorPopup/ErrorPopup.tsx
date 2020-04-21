import React from 'react';
import Popup from '../Popup/Popup';

interface ErrorPopupProps {
  message: string;
  onOkClicked?(): void;
}

const ErrorPopup = (props: ErrorPopupProps) => {
  const onClick = () => {
    if (props.onOkClicked) {
      props.onOkClicked();
    }
  };
  return (
    <Popup content={(
      <>
        <p>{props.message}</p>
        <button onClick={onClick} type="button">Зрозумiло...</button>
      </>
    )}
    />
  );
};

export default ErrorPopup;
