import React from 'react';
import styles from './Popup.module.css';

const Popup = props => {
    const onClick = () => {
        props.onCancel && props.onCancel();
    }
    return (
        <div className={styles.Background} onClick={onClick}>
            <div className={styles.Popup} onClick={e => {e.stopPropagation()}}>
                {props.children}
            </div>
        </div>
    );
};

export default Popup;