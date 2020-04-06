import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorPopup from '../../components/Popups/ErrorPopup/ErrorPopup';
import { errorOccured } from '../../store/actions/appState';

const ErrorHandler = () => {
  const error = useSelector((state) => state.appState.error);
  const dispatch = useDispatch();

  if (!error) {
    return null;
  }

  const onOkClicked = () => {
    dispatch(errorOccured(null));
  };

  return (
    <ErrorPopup
      message={error.message}
      onOkClicked={onOkClicked}
    />
  );
};

export default ErrorHandler;
