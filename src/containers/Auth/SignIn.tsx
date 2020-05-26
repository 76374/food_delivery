import React from 'react';
import styles from './Auth.module.css';
import { RouteComponentProps } from 'react-router';
import SignInData from '../../dto/SignInData';
import SignInForm from '../../components/AuthForm/SignInForm';
import useSignIn from '../../hooks/useSignIn';
import useStore from '../../hooks/useStore';
import AppPath from '../../const/AppPath';

const SignIn = (props: RouteComponentProps) => {
  const { order } = useStore();
  const signIn = useSignIn();
  
  const onSubmit = (signInData: SignInData) => {
    signIn(signInData, () => {
      props.history.push(order.containsOrderedItems ? AppPath.CHECKOUT : AppPath.ORDER);
    });
  };

  return (
    <div className={styles.Auth}>
      <SignInForm onSubmit={onSubmit} />
    </div>
  );
};

export default SignIn;
