import React from 'react';
import ErrorPopup from '../../components/Popups/ErrorPopup/ErrorPopup';
import useStore from '../../hooks/useStore';

const ErrorHandler = () => {
  const { appState } = useStore();

  if (!appState.error) {
    return null;
  }

  console.log(appState.error);

  const onOkClicked = () => {
    appState.error = null;
  };

  return (
    <ErrorPopup
      message={appState.error.message}
      onOkClicked={onOkClicked}
    />
  );
};

export default ErrorHandler;
