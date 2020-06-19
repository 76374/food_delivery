import React from 'react';
import { useLocalStore, observer } from 'mobx-react';
import Locale from '../../service/Locale';
import LocaleKey from '../../const/LocaleKey';
import SignInData from '../../dto/SignInData';
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

const validateEmail: (value: string) => EmailValidationError = emailValidator();
const validatePwd: (value: string) => PwdValidationError = pwdValidator();

const getFormField = (
  placeHolderKey: string,
  error: ValidationError,
  onChange: (value: string) => void
) => {
  const errorKey = getAuthErrorKey(error);
  return {
    placeholder: Locale.get(placeHolderKey),
    error: errorKey ? Locale.get(errorKey) : null,
    onChange: onChange,
  };
};

const SignInPopup = (props: SignInProps) => {
  const localStore = useLocalStore(() => ({
    email: '',
    emailError: EmailValidationError.None,
    pwd: '',
    pwdError: PwdValidationError.None,
    validated: false,
    submited: false,
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

    const hasError = localStore.emailError || localStore.pwdError;
    if (!hasError) {
      localStore.submited = true;
      props.onSubmit({
        email: localStore.email,
        pwd: localStore.pwd,
      });
    }
  };

  const hasError = localStore.emailError !== 0 || localStore.pwdError !== 0;

  const getFields = () => [
    getFormField(LocaleKey.AUTH_INPUT_EMAIL, localStore.emailError, onEmailChanged),
    getFormField(LocaleKey.AUTH_INPUT_PWD, localStore.pwdError, onPwdChanged),
  ];

  return (
    <AuthPopup
      header={Locale.get(LocaleKey.AUTH_TITLE_SIGN_IN)}
      submitText={Locale.get(LocaleKey.AUTH_BT_SIGN_IN)}
      isLoading={localStore.submited}
      submitDisabled={localStore.validated && hasError}
      onSubmit={onSubmit}
      onCancel={props.onCancel}
      content={<AuthForm fields={getFields()} showValid={localStore.validated} />}
    />
  );
};

interface SignInProps {
  onSubmit(signInData: SignInData): void;
  onCancel(): void;
}

export default observer(SignInPopup);
