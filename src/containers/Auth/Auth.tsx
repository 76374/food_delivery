import React from 'react';
import styles from './Auth.module.css';
import AuthForm from '../../components/AuthForm/AuthForm';
import useLocalData from '../../hooks/useLocalData';
import { RouteComponentProps } from 'react-router';
import AuthData from '../../dto/AuthData';

const Auth = (props: RouteComponentProps) => {
  const { setUserData } = useLocalData();

  const onSubmit = (authData: AuthData) => {
    setUserData(authData.firstName, authData.lastName);

    props.history.goBack();
  };

  return (
    <div className={styles.Auth}>
      <AuthForm onSubmit={onSubmit} />
    </div>
  );
};

export default Auth;
