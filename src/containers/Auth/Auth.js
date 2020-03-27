import React from 'react';
import styles from './Auth.module.css';
import AuthForm from '../../components/AuthForm/AuthForm';
import { useDispatch } from 'react-redux';
import { authSubmited } from '../../store/actions/appState';

const Auth = props => {
    const dispatch = useDispatch();

    const onSubmit = authData => {
        dispatch(authSubmited(authData));
        props.history.goBack();
    }

    return (
        <div className={styles.Auth}>
            <AuthForm onSubmit={onSubmit} />
        </div>
    );
}

export default Auth;