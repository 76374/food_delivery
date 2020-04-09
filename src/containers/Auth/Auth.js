import React from 'react';
import styles from './Auth.module.css';
import AuthForm from '../../components/AuthForm/AuthForm';
import useLocalData from '../../hooks/useLocalData';

const Auth = (props) => {
  const localData = useLocalData();

  const onSubmit = (authData) => {
    localData.setUserData(authData.firstName, authData.lastName);

    props.history.goBack();
  };

  return (
    <div className={styles.Auth}>
      <AuthForm onSubmit={onSubmit} />
    </div>
  );
};

export default Auth;
