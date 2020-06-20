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
  ValidationError
} from '../../utils/validator';
import { getAuthErrorKey } from '../../utils/LocaleKeyUtil';
import SignUpData from '../../dto/SignUpData';
import AuthPopup from '../../components/AuthForm/AuthPopup';
import AuthForm from '../../components/AuthForm/AuthForm';

const validateName = nameValidator();
const validateEmail = emailValidator();
const validatePwd = pwdValidator();

const getFormField = (
  placeHolderKey: string,
  error: ValidationError,
  onChange: (value: string) => void
) => ({
  placeholder: Locale.get(placeHolderKey),
  error: error ? Locale.get(String(getAuthErrorKey(error))) : null,
  onChange: onChange,
});

const containsError = (store: any) =>
  store.firstNameError !== 0 ||
  store.lastNameError !== 0 ||
  store.emailError !== 0 ||
  store.pwdError !== 0;

const SignUpPopup = (props: SignUpPopupProps) => {
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
    // to check if fields haven't been edited
    localStore.firstNameError = validateName(localStore.firstName);
    localStore.lastNameError = validateName(localStore.lastName);
    localStore.emailError = validateEmail(localStore.email);
    localStore.pwdError = validatePwd(localStore.pwd);

    if (containsError(localStore)) {
      return;
    }

    if (props.onSubmit) {
      props.onSubmit({
        firstName: localStore.firstName,
        lastName: localStore.lastName,
        email: localStore.email,
        pwd: localStore.pwd,
      });
    }
  };

  const getFields = () => [
    getFormField(LocaleKey.AUTH_INPUT_FIRST_NAME, localStore.firstNameError, onFirstNameChanged),
    getFormField(LocaleKey.AUTH_INPUT_LAST_NAME, localStore.lastNameError, onLastNameChanged),
    getFormField(LocaleKey.AUTH_INPUT_EMAIL, localStore.emailError, onEmailChanged),
    getFormField(LocaleKey.AUTH_INPUT_PWD, localStore.pwdError, onPwdChanged),
  ];

  return (
    <AuthPopup
      header={Locale.get(LocaleKey.AUTH_TITLE_SIGN_UP)}
      submitText={Locale.get(LocaleKey.AUTH_BT_SIGN_UP)}
      isLoading={localStore.submited}
      submitDisabled={localStore.validated && containsError(localStore)}
      onSubmit={onSubmit}
      onCancel={props.onCancel}
      content={<AuthForm fields={getFields()} showValid={localStore.validated} />}
    />
  );
};

interface SignUpPopupProps {
  onSubmit(signUpData: SignUpData): void;
  onCancel(): void;
}

export default observer(SignUpPopup);
