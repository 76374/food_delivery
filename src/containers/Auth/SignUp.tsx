import React from 'react';
import styles from './Auth.module.css';
import { RouteComponentProps } from 'react-router';
import SignUpForm from '../../components/AuthForm/SignUpForm';
import useStore from '../../hooks/useStore';
import AppPath from '../../const/AppPath';
import SignUpData from '../../dto/SignUpData';
import sendRequest from '../../service/network/signUp';

const SignUp = (props: RouteComponentProps) => {
  const { order, user } = useStore();

  const onSubmit = (signUpData: SignUpData) => {
    sendRequest(signUpData).then((response) => {
      const userData = response.signUp.user;
      user.setUserDetails(userData.firstName, userData.lastName, userData.email);
      user.setToken(response.signUp.token);

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
