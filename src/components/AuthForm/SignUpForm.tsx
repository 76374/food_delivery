import React from 'react';
import styles from './AuthForm.module.css';
import Locale from '../../utils/Locale';
import LocaleKey from '../../const/LocaleKey';
import Button from '../Button/Button';
import { useLocalStore, observer } from 'mobx-react';
import {
  emailValidator,
  EmailValidationError,
  pwdValidator,
  PwdValidationError,
  NameValidationError,
  nameValidator,
} from '../../utils/validator';
import InputField from './InputField';
import { getAuthErrorKey } from '../../utils/LocaleKeyUtil';
import SignUpData from '../../dto/SignUpData';

const validateName = nameValidator();
const validateEmail = emailValidator();
const validatePwd = pwdValidator();

const getLocale = (key: string | null): string | null => {
  return key ? Locale.get(key) : null;
};

const SignUpForm = (props: SignUpProps) => {
  const localStore = useLocalStore(() => ({
    firstName: '',
    firstNameError: NameValidationError.None,
    lastName: '',
    lastNameError: NameValidationError.None,
    email: '',
    emailError: EmailValidationError.None,
    pwd: '',
    pwdError: PwdValidationError.None
  }));

  const onFirstNameChanged = (value: string) => {
    localStore.firstName = value;
    localStore.firstNameError = validateName(value);
  };
  const onLastNameChanged = (value: string) => {
    localStore.lastName = value;
    localStore.lastNameError = validateName(value);
  };
  const onEmailChanged = (value: string) => {
    localStore.email = value;
    localStore.emailError = validateEmail(value);
  };
  const onPwdChanged = (value: string) => {
    localStore.pwd = value;
    localStore.pwdError = validatePwd(value);
  };

  const onSubmit = () => {
    // to check if fields haven't been edited
    localStore.firstNameError = validateName(localStore.firstName);
    localStore.lastNameError = validateName(localStore.lastName);
    localStore.emailError = validateEmail(localStore.email);
    localStore.pwdError = validatePwd(localStore.pwd);

    if (
      localStore.firstNameError ||
      localStore.lastNameError ||
      localStore.emailError ||
      localStore.pwdError
    ) {
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

  return (
    <div className={styles.AuthForm}>
      <InputField
        label={Locale.get(LocaleKey.AUTH_INPUT_FIRST_NAME)}
        onChange={onFirstNameChanged}
        errorMessage={getLocale(getAuthErrorKey(localStore.firstNameError))}
      />
      <InputField
        label={Locale.get(LocaleKey.AUTH_INPUT_LAST_NAME)}
        onChange={onLastNameChanged}
        errorMessage={getLocale(getAuthErrorKey(localStore.lastNameError))}
      />
      <InputField
        label={Locale.get(LocaleKey.AUTH_INPUT_EMAIL)}
        onChange={onEmailChanged}
        errorMessage={getLocale(getAuthErrorKey(localStore.emailError))}
      />
      <InputField
        label={Locale.get(LocaleKey.AUTH_INPUT_PWD)}
        onChange={onPwdChanged}
        errorMessage={getLocale(getAuthErrorKey(localStore.pwdError))}
        isPassword
      />
      <Button text={Locale.get(LocaleKey.AUTH_BT_SUBMIT)} onClick={onSubmit} />
    </div>
  );
};

interface SignUpProps {
  onSubmit(signUpData: SignUpData): void;
}

export default observer(SignUpForm);
