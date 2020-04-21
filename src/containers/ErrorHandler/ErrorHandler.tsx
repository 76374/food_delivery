import React, { useCallback } from 'react';
import ErrorPopup from '../../components/Popups/ErrorPopup/ErrorPopup';
import useStore from '../../hooks/useStore';

const ErrorHandler = () => {
  const { appState } = useStore();

  const onOkClicked: () => void = useCallback(() => {
    appState.clearError();
  }, [appState]);

  if (!appState.error) {
    return null;
  }

  return (
    <ErrorPopup
      message={appState.error.message}
      onOkClicked={onOkClicked}
    />
  );
};

export default ErrorHandler;
