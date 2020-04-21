/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { KeyboardEvent } from 'react';
import styles from './Popup.module.css';

interface PopupProps {
  content: JSX.Element;
  onCancel?(): void;
}

const Popup = (props: PopupProps) => {
  const { content, onCancel } = props;
  const onClick = () => {
    if (onCancel) {
      onCancel();
    }
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.keyCode === 27) {
      if (onCancel) {
        onCancel();
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
