import React from 'react';
import styles from './Button.module.css';

const Button = props => {
    const getClass = type => {
        switch (type) {
            case 1: return styles.Button1;
            default: return styles.Button0;
        }
    };
    return (
        <button className={getClass(props.type)} onClick={props.onClick}>
            {props.text}
        </button>
    )
};

export default Button;