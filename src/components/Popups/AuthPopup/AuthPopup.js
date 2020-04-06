import React from 'react';
import Popup from '../Popup/Popup';
import AuthForm from '../../AuthForm/AuthForm';

const AuthPopup = (props) => {
  const { onSubmit, onCancel } = props;
  const form = <AuthForm onSubmit={onSubmit} />;
  return <Popup onCancel={onCancel} content={form} />;
};

export default AuthPopup;
