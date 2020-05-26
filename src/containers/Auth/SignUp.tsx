import React from 'react';
import styles from './Auth.module.css';
import { RouteComponentProps } from 'react-router';
import SignUpForm from '../../components/AuthForm/SignUpForm';
import useSignUp from '../../hooks/useSignUp';
import useStore from '../../hooks/useStore';
import AppPath from '../../const/AppPath';
import SignUpData from '../../dto/SignUpData';

const SignUp = (props: RouteComponentProps) => {
  const { order } = useStore();
  const signUp = useSignUp();

  const onSubmit = (signUpData: SignUpData) => {
    signUp(signUpData, () => {
      props.history.push(order.containsOrderedItems ? AppPath.CHECKOUT : AppPath.ORDER);
    });
  };

  return (
    <div className={styles.Auth}>
      <SignUpForm onSubmit={onSubmit} />
    </div>
  );
};

export default SignUp;