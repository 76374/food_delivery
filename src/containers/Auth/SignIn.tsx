import React from 'react';
import { observer } from 'mobx-react';
import SignInData from '../../dto/SignInData';
import SignInForm from '../../components/AuthForm/SignInForm';
import useStore from '../../hooks/useStore';
import sendRequest from '../../service/network/signIn';
import handleAuthData from './handleAuthData';

const SignIn = () => {
  const { user, appState } = useStore();

  const onSignInSubmit = (signInData: SignInData) => {
    sendRequest(signInData)
      .then((response) => {
        handleAuthData(user, response.signIn);
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

  if (appState.authPopup === 'signIn') {
    return <SignInForm onSubmit={onSignInSubmit} onCancel={onCancel} />;
  }

  return null;
};

export default observer(SignIn);
