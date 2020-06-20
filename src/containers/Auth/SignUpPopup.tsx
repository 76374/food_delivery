import React from 'react';
import Locale from '../../service/Locale';
import LocaleKey from '../../const/LocaleKey';
import { useLocalStore, observer } from 'mobx-react';
import {
  emailValidator,
  EmailValidationError,
  pwdValidator,
  PwdValidationError,
  NameValidationError,
  nameValidator,
  ValidationError,
} from '../../utils/validator';
import { getAuthErrorKey } from '../../utils/LocaleKeyUtil';
import AuthPopup from '../../components/AuthForm/AuthPopup';
import AuthForm from '../../components/AuthForm/AuthForm';
import sendRequest from '../../service/network/signUp';
import handleAuthData from './handleAuthData';
import useStore from '../../hooks/useStore';

const validateName = nameValidator();
const validateEmail = emailValidator();
const validatePwd = pwdValidator();

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

const containsError = (store: any) =>
  store.firstNameError !== 0 ||
  store.lastNameError !== 0 ||
  store.emailError !== 0 ||
  store.pwdError !== 0;

const SignUpPopup = () => {
  const { user, appState } = useStore();

  const localStore = useLocalStore(() => ({
    firstName: '',
    firstNameError: NameValidationError.None,
    lastName: '',
    lastNameError: NameValidationError.None,
    email: '',
    emailError: EmailValidationError.None,
    pwd: '',
    pwdError: PwdValidationError.None,
    validated: false,
    submited: false,
    error: null,
  }));

  const onFirstNameChanged = (value: string) => {
    localStore.firstName = value;
    if (localStore.validated) {
      localStore.firstNameError = validateName(value);
    }
  };
  const onLastNameChanged = (value: string) => {
    localStore.lastName = value;
    if (localStore.validated) {
      localStore.lastNameError = validateName(value);
    }
  };
  const onEmailChanged = (value: string) => {
    localStore.email = value;
    if (localStore.validated) {
      localStore.emailError = validateEmail(value);
    }
  };
  const onPwdChanged = (value: string) => {
    localStore.pwd = value;
    if (localStore.validated) {
      localStore.pwdError = validatePwd(value);
    }
  };

  const onSubmit = () => {
    localStore.validated = true;
    localStore.firstNameError = validateName(localStore.firstName);
    localStore.lastNameError = validateName(localStore.lastName);
    localStore.emailError = validateEmail(localStore.email);
    localStore.pwdError = validatePwd(localStore.pwd);

    if (!containsError(localStore)) {
      localStore.submited = true;

      sendRequest({
        firstName: localStore.firstName,
        lastName: localStore.lastName,
        email: localStore.email,
        pwd: localStore.pwd,
      })
        .then((response) => {
          handleAuthData(user, response.signUp);
          appState.setAuthPopup(null);
        })
        .catch((err) => {
          localStore.submited = false;
          localStore.error = Locale.contains(err.key) ? Locale.get(err.key) : err.message;
        });
    }
  };

  const onCancel = () => {
    appState.setAuthPopup(null);
  };

  if (appState.authPopup !== 'signUp') {
    return null;
  }

  const fields = [
    getFormField(LocaleKey.AUTH_INPUT_FIRST_NAME, localStore.firstNameError, onFirstNameChanged),
    getFormField(LocaleKey.AUTH_INPUT_LAST_NAME, localStore.lastNameError, onLastNameChanged),
    getFormField(LocaleKey.AUTH_INPUT_EMAIL, localStore.emailError, onEmailChanged),
    getFormField(LocaleKey.AUTH_INPUT_PWD, localStore.pwdError, onPwdChanged, true),
  ];

  return (
    <AuthPopup
      header={Locale.get(LocaleKey.AUTH_TITLE_SIGN_UP)}
      submitText={Locale.get(LocaleKey.AUTH_BT_SIGN_UP)}
      isLoading={localStore.submited}
      error={localStore.error}
      submitDisabled={localStore.validated && containsError(localStore)}
      onSubmit={onSubmit}
      onCancel={onCancel}
      content={<AuthForm fields={fields} showValid={localStore.validated} />}
    />
  );
};

export default observer(SignUpPopup);
