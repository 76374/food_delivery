import React from 'react';
import styles from './AuthForm.module.css';
import Locale from '../../utils/Locale';
import LocaleKey from '../../const/LocaleKey';
import Button from '../Button/Button';
import { useLocalStore, observer } from 'mobx-react';
import SignInData from '../../dto/SignInData';
import {
  emailValidator,
  EmailValidationError,
  pwdValidator,
  PwdValidationError,
} from '../../utils/validator';
import InputField from './InputField';
import { getAuthErrorKey } from '../../utils/LocaleKeyUtil';

const validateEmail: (value: string) => EmailValidationError = emailValidator();
const validatePwd: (value: string) => PwdValidationError = pwdValidator();

const getLocale = (key: string | null): string | null => {
  return key ? Locale.get(key) : null;
};

const SignInForm = (props: SignInProps) => {
  const localStore = useLocalStore(() => ({
    email: '',
    emailError: EmailValidationError.None,
    pwd: '',
    pwdError: PwdValidationError.None,
  }));

  const onEmailChanged = (value: string): void => {
    localStore.email = value;
  };
  const onPwdChanged = (value: string): void => {
    localStore.pwd = value;
  };
  const onSubmit = () => {
    localStore.emailError = validateEmail(localStore.email);
    localStore.pwdError = validatePwd(localStore.pwd);

    const hasError = localStore.emailError || localStore.pwdError;
    console.log('has error', hasError);
    if (!hasError && props.onSubmit) {
      props.onSubmit({
        email: localStore.email,
        pwd: localStore.pwd,
      });
    }
  };

  return (
    <div className={styles.AuthForm}>
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

interface SignInProps {
  onSubmit(signInData: SignInData): void;
}

export default observer(SignInForm);
