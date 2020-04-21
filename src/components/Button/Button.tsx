import React, { MouseEvent } from 'react';
import styles from './Button.module.css';

enum ButtonType {
  Type1,
  Type2,
}

interface ButtonProps {
  type?: ButtonType;
  text: string;
  onClick(e: MouseEvent): void;
}

const Button = (props: ButtonProps) => {
  const getClass = (type: ButtonType) => {
    switch (type) {
      case ButtonType.Type2:
        return styles.Button1;
      default:
        return styles.Button0;
    }
  };
  return (
    <button
      className={getClass(props.type || ButtonType.Type1)}
      onClick={props.onClick}
      type="button"
    >
      {props.text}
    </button>
  );
};

export default Button;
