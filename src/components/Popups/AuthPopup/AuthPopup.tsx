import React from 'react';
import Popup from '../Popup/Popup';
import AuthForm from '../../AuthForm/AuthForm';
import AuthData from '../../../dto/AuthData';

interface AuthPopupProps {
  onSubmit(authData: AuthData): void;
  onCancel(): void;
}

const AuthPopup = (props: AuthPopupProps) => {
  const form = <AuthForm onSubmit={props.onSubmit} />;
  return <Popup onCancel={props.onCancel} content={form} />;
};

export default AuthPopup;
