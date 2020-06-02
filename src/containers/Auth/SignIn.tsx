import React from 'react';
import styles from './Auth.module.css';
import { RouteComponentProps } from 'react-router';
import SignInData from '../../dto/SignInData';
import SignInForm from '../../components/AuthForm/SignInForm';
import useStore from '../../hooks/useStore';
import AppPath from '../../const/AppPath';
import sendRequest from '../../service/network/signIn';
import handleAuthData from './handleSignIn';

const SignIn = (props: RouteComponentProps) => {
  const { order, user, appState } = useStore();

  const onSubmit = (signInData: SignInData) => {
    sendRequest(signInData)
      .then((response) => {
        handleAuthData(user, response.signIn);

        props.history.push(order.containsOrderedItems ? AppPath.CHECKOUT : AppPath.ORDER);
      })
      .catch((err) => {
        appState.setError(err);
      });
  };

  return (
    <div className={styles.Auth}>
      <SignInForm onSubmit={onSubmit} />
    </div>
  );
};

export default SignIn;
