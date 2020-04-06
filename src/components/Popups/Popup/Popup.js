/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import styles from './Popup.module.css';

const Popup = (props) => {
  const { content } = props;
  const onClick = () => {
    if (props.onCancel) {
      props.onCancel();
    }
  };
  const onKeyDown = (e) => {
    if (e.keyCode === 27) {
      if (props.onCancel) {
        props.onCancel();
      }
    }
  };
  return (
    <div className={styles.Background} onClick={onClick} onKeyDown={onKeyDown}>
      <div
        className={styles.Popup}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {content}
      </div>
    </div>
  );
};

export default Popup;
