import React, { useState } from 'react';
import styles from './AuthForm.module.css';

const AuthForm = props => {
    const [inputData, setInputData] = useState({
        firstName: '',
        firstNameValid: true,
        lastName: '',
        lastNameValid: true
    });

    const setInputDataProp = prop => {
        setInputData(prevState => ({ ...prevState, ...prop }));
    }

    const onFirstNameChanged = e => {
        setInputDataProp({ firstName: e.target.value });
    }
    const onLastNameChanged = e => {
        setInputDataProp({ lastName: e.target.value });
    }
    const getInputField = (label, onChange, isValid) => (
        <div className={styles.InputField}>
            <p><label>{label}</label></p>
            <p><input className={isValid ? null : styles.InvalidInput} onChange={onChange} /></p>
        </div>
    );
    const onSubmit = () => {
        const { firstName, lastName } = inputData;
        const firstNameValid = firstName.length > 0;
        const lastNameValid = firstName.length > 0;

        setInputDataProp({ firstNameValid, lastNameValid });

        if (firstNameValid && lastNameValid) {
            props.onSubmit && props.onSubmit({ firstName, lastName });
        }
    }
    return (
        <div className={styles.AuthForm}>
            {getInputField(`Iм'я`, onFirstNameChanged, inputData.firstNameValid)}
            {getInputField("Прiзвище", onLastNameChanged, inputData.lastNameValid)}
            <input type="button" value="Вiдправити" onClick={onSubmit} />
        </div>
    );
};

export default AuthForm;