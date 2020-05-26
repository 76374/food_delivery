import { useCallback } from 'react';
import useApiCall from './apiCall';
import useStore from './useStore';
import SignInData from '../dto/SignInData';

const query = `
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      token
      user {
          firstName
          lastName
          email
      }
    }
  }
`;

const useSignIn = () => {
  const { user } = useStore();
  const apiCall = useApiCall();

  return useCallback(
    (signInData: SignInData, successCallback: (() => void) | null = null) => {
      const requestPayload = {
        query,
        input: {
          email: signInData.email,
          pwd: signInData.pwd,
        },
      };
      apiCall(requestPayload, (data) => {
        const userData = data.signUp.user;
        user.setUserDetails(userData.firstName, userData.lastName, userData.email);
        user.setToken(data.signUp.token);

        if (successCallback) {
          successCallback();
        }
      });
    },
    [apiCall, user]
  );
};

export default useSignIn;
