import React from 'react';
import { observer } from 'mobx-react';
import useStore from '../../hooks/useStore';
import SignUpData from '../../dto/SignUpData';
import sendRequest from '../../service/network/signUp';
import handleAuthData from './handleAuthData';
import SignUpPopup from './SignUpPopup';

const SignUp = () => {
  const { user, appState } = useStore();

  const onSubmit = (signUpData: SignUpData) => {
    sendRequest(signUpData)
      .then((response) => {
        handleAuthData(user, response.signUp);
      })
      .catch((err) => {
        appState.setError(err);
      })
      .then(() => {
        appState.setAuthPopup(null);
      });
  };

  const onCancel = () => {
    appState.setAuthPopup(null);
  };

  if (appState.authPopup === 'signUp') {
    return <SignUpPopup onSubmit={onSubmit} onCancel={onCancel} />;
  }
  return null;
};

export default observer(SignUp);
