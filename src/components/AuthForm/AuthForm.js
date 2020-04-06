import React, { useState } from 'react';
import styles from './AuthForm.module.css';
import locale from '../../data/locale';
import localeKey from '../../data/localeKey';
import Button from '../Button/Button';

const AuthForm = (props) => {
  const [inputData, setInputData] = useState({
    firstName: '',
    firstNameValid: true,
    lastName: '',
    lastNameValid: true,
  });

  const setInputDataProp = (prop) => {
    setInputData((prevState) => ({ ...prevState, ...prop }));
  };

  const onFirstNameChanged = (e) => {
    setInputDataProp({ firstName: e.target.value });
  };
  const onLastNameChanged = (e) => {
    setInputDataProp({ lastName: e.target.value });
  };
  const getInputField = (label, onChange, isValid) => (
    <div className={styles.InputField}>
      <p>{label}</p>
      <p>
        <input className={isValid ? null : styles.InvalidInput} onChange={onChange} />
      </p>
    </div>
  );
  const onSubmit = () => {
    const { firstName, lastName } = inputData;
    const firstNameValid = firstName.length > 0;
    const lastNameValid = firstName.length > 0;

    setInputDataProp({ firstNameValid, lastNameValid });

    if (firstNameValid && lastNameValid && props.onSubmit) {
      props.onSubmit({ firstName, lastName });
    }
  };
  return (
    <div className={styles.AuthForm}>
      {getInputField(
        locale.get(localeKey.AUTH_INPUT_FIRST_NAME),
        onFirstNameChanged,
        inputData.firstNameValid
      )}
      {getInputField(
        locale.get(localeKey.AUTH_INPUT_LAST_NAME),
        onLastNameChanged,
        inputData.lastNameValid
      )}
      <Button text={locale.get(localeKey.AUTH_BT_SUBMIT)} onClick={onSubmit} />
    </div>
  );
};

export default AuthForm;
