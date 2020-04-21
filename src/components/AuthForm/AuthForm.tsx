import React, { ChangeEvent } from 'react';
import styles from './AuthForm.module.css';
import Locale from '../../utils/Locale';
import LocaleKey from '../../const/LocaleKey';
import Button from '../Button/Button';
import { useLocalStore, observer } from 'mobx-react';
import AuthData from '../../dto/AuthData';

const AuthForm = (props: AuthFormProps) => {
  const localStore = useLocalStore(() => ({
    firstName: '',
    firstNameValid: true,
    lastName: '',
    lastNameValid: true,
  }));

  const onFirstNameChanged: InputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    localStore.firstName = e.target.value;
  };
  const onLastNameChanged: InputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    localStore.lastName = e.target.value;
  };
  const getInputField = (label: string, onChange: InputHandler, isValid: boolean) => (
    <div className={styles.InputField}>
      <p>{label}</p>
      <p>
        <input className={isValid ? undefined : styles.InvalidInput} onChange={onChange} />
      </p>
    </div>
  );
  const onSubmit = () => {
    localStore.firstNameValid = localStore.firstName.length > 0;
    localStore.lastNameValid = localStore.lastName.length > 0;

    if (localStore.firstNameValid && localStore.lastNameValid && props.onSubmit) {
      props.onSubmit({
        firstName: localStore.firstName,
        lastName: localStore.lastName,
      });
    }
  };
  return (
    <div className={styles.AuthForm}>
      {getInputField(
        Locale.get(LocaleKey.AUTH_INPUT_FIRST_NAME),
        onFirstNameChanged,
        localStore.firstNameValid
      )}
      {getInputField(
        Locale.get(LocaleKey.AUTH_INPUT_LAST_NAME),
        onLastNameChanged,
        localStore.lastNameValid
      )}
      <Button text={Locale.get(LocaleKey.AUTH_BT_SUBMIT)} onClick={onSubmit} />
    </div>
  );
};

interface AuthFormProps {
  onSubmit(authData: AuthData): void;
}

interface InputHandler {
  (e: ChangeEvent<HTMLInputElement>): void;
}

export default observer(AuthForm);
