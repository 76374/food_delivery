import { useCallback } from 'react';
import useApiCall from './apiCall';
import useStore from './useStore';
import SignUpData from '../dto/SignUpData';

const query = `
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      token
      user {
          firstName
          lastName
          email
      }
    }
  }
`;

const useSignUp = () => {
  const { user } = useStore();
  const apiCall = useApiCall();

  return useCallback(
    (signUpData: SignUpData, successCallback: (() => void) | null = null) => {
      const requestPayload = {
        query,
        input: {
          firstName: signUpData.firstName,
          lastName: signUpData.lastName,
          email: signUpData.email,
          pwd: signUpData.pwd,
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

export default useSignUp;
