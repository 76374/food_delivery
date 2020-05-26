import React, { ChangeEvent } from 'react';
import styles from './AuthForm.module.css';
import { useCallback } from 'react';

const InputField = (props: InoutFieldProps) => {
  const { label, errorMessage, onChange, isPassword } = props;

  const onInputChange: InputHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  let inputStyle: string | undefined = undefined;
  if (errorMessage) {
    inputStyle = styles.InvalidInput;
  }
  let type: string | undefined = undefined;
  if (isPassword) {
    type = "password";
  }

  return (
    <div className={styles.InputField}>
      <p>{label}{errorMessage ? ' ' + errorMessage : null}</p>
      <p>
        <input type={type} className={inputStyle} onChange={onInputChange} />
      </p>
    </div>
  );
};

interface InputHandler {
  (e: ChangeEvent<HTMLInputElement>): void;
}

interface InoutFieldProps {
  label: string;
  errorMessage: string | null;
  onChange(value: string): void;
  isPassword?: boolean
}

export default InputField;
