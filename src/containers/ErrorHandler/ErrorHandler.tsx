import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import ErrorPopup from '../../components/Popups/ErrorPopup/ErrorPopup';
import useStore from '../../hooks/useStore';
import Locale from '../../service/Locale';
import LocaleKey from '../../const/LocaleKey';

const getMessage = (error: any) => {
  if (error.message === 'Network Error') {
    return Locale.get(LocaleKey.NETWORK_ERROR);
  }
  if (error.code >= 500) {
    return Locale.get(LocaleKey.SERVER_ERROR);
  }
  if (error.key && Locale.contains(error.key)) {
    return Locale.get(error.key);
  }
  return error.message;
}

const ErrorHandler = () => {
  const { appState } = useStore();

  const onOkClicked = useCallback(() => {
    appState.clearError();
  }, [appState]);

  if (!appState.error) {
    return null;
  }

  return (
    <ErrorPopup
      message={getMessage(appState.error)}
      onOkClicked={onOkClicked}
    />
  );
};

export default observer(ErrorHandler);
