import React from 'react';
import styles from './Popup.module.css';

const Popup = props => {
    const onClick = () => {
        console.log('click ', props.onCancel)
        props.onCancel && props.onCancel();
    }
    return (
        <div className={styles.Background} onClick={onClick}>
            <div className={styles.Popup}>
                {props.children}
            </div>
        </div>
    );
};

export default Popup;