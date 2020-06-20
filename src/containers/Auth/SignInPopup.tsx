import React from 'react';
import { useLocalStore, observer } from 'mobx-react';
import Locale from '../../service/Locale';
import LocaleKey from '../../const/LocaleKey';
import {
  emailValidator,
  EmailValidationError,
  pwdValidator,
  PwdValidationError,
  ValidationError,
} from '../../utils/validator';
import { getAuthErrorKey } from '../../utils/LocaleKeyUtil';
import AuthPopup from '../../components/AuthForm/AuthPopup';
import AuthForm from '../../components/AuthForm/AuthForm';
import sendRequest from '../../service/network/signIn';
import useStore from '../../hooks/useStore';
import handleAuthData from './handleAuthData';

const validateEmail: (value: string) => EmailValidationError = emailValidator();
const validatePwd: (value: string) => PwdValidationError = pwdValidator(0);

const getFormField = (
  placeHolderKey: string,
  error: ValidationError,
  onChange: (value: string) => void,
  isPassword?: boolean
) => ({
  placeholder: Locale.get(placeHolderKey),
  error: error ? Locale.get(String(getAuthErrorKey(error))) : null,
  isPassword,
  onChange,
});

const containsError = (store: any) => store.emailError !== 0 || store.pwdError !== 0;

const SignInPopup = () => {
  const { user, appState } = useStore();

  const localStore = useLocalStore(() => ({
    email: '',
    emailError: EmailValidationError.None,
    pwd: '',
    pwdError: PwdValidationError.None,
    validated: false,
    submited: false,
    error: null,
  }));

  const onEmailChanged = (email: string): void => {
    localStore.email = email;
    if (localStore.validated) {
      localStore.emailError = validateEmail(email);
    }
  };

  const onPwdChanged = (pwd: string): void => {
    localStore.pwd = pwd;
    if (localStore.validated) {
      localStore.pwdError = validatePwd(pwd);
    }
  };

  const onSubmit = () => {
    localStore.validated = true;
    localStore.emailError = validateEmail(localStore.email);
    localStore.pwdError = validatePwd(localStore.pwd);

    if (!containsError(localStore)) {
      localStore.submited = true;

      sendRequest({
        email: localStore.email,
        pwd: localStore.pwd,
      })
        .then((response) => {
          handleAuthData(user, response.signIn);
          appState.setAuthPopup(null);
        })
        .catch((err) => {
          console.log(err);
          localStore.submited = false;
          localStore.error = Locale.contains(err.key) ? Locale.get(err.key) : err.message;
        });
    }
  };

  const onCancel = () => {
    appState.setAuthPopup(null);
  };

  if (appState.authPopup !== 'signIn') {
    return null;
  }

  const fields = [
    getFormField(LocaleKey.AUTH_INPUT_EMAIL, localStore.emailError, onEmailChanged),
    getFormField(LocaleKey.AUTH_INPUT_PWD, localStore.pwdError, onPwdChanged, true),
  ];

  return (
    <AuthPopup
      header={Locale.get(LocaleKey.AUTH_TITLE_SIGN_IN)}
      submitText={Locale.get(LocaleKey.AUTH_BT_SIGN_IN)}
      error={localStore.error}
      isLoading={localStore.submited}
      submitDisabled={localStore.validated && containsError(localStore)}
      onSubmit={onSubmit}
      onCancel={onCancel}
      content={<AuthForm fields={fields} showValid={localStore.validated} />}
    />
  );
};

export default observer(SignInPopup);
