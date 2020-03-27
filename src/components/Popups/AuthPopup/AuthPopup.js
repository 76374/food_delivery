import React from 'react';
import Popup from '../Popup/Popup';
import AuthForm from '../../AuthForm/AuthForm';

const AuthPopup = props => {
    const form = <AuthForm onSubmit={props.onSubmit} />;
    return (
        <Popup onCancel={props.onCancel} children={form}/>
    );
};

export default AuthPopup;