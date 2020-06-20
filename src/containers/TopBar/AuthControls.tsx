import React from 'react';
import { observer } from 'mobx-react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Locale from '../../service/Locale';
import LocaleKey from '../../const/LocaleKey';
import useStore from '../../hooks/useStore';
import LocalData from '../../utils/LocalData';
import { useCallback } from 'react';

const AuthControls = () => {
  const { user, appState } = useStore();

  const signInClickHandler = useCallback(() => {
    appState.setAuthPopup('signIn');
  }, [appState]);

  const signUpClickHandler = useCallback(() => {
    appState.setAuthPopup('signUp');
  }, [appState]);

  const logoutClickHandler = useCallback(() => {
    LocalData.clearUserData();
    user.signOut();
  }, [user]);

  if (user.isSignedIn) {
    return (
      <Button onClick={logoutClickHandler}>
        {Locale.get(LocaleKey.TOP_BAR_BT_LOGOUT, user.firstName)}
      </Button>
    );
  }
  return (
    <ButtonGroup>
      <Button variant="outline-primary" onClick={signInClickHandler}>
        {Locale.get(LocaleKey.TOP_BAR_BT_SIGN_IN)}
      </Button>
      <Button onClick={signUpClickHandler}>{Locale.get(LocaleKey.TOP_BAR_BT_SIGN_UP)}</Button>
    </ButtonGroup>
  );
};

export default observer(AuthControls);
