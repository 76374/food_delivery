import RequestData from '../../dto/RequestData';
import SignUpData from '../../dto/SignUpData';
import Network from './Network';
import { AuthData } from './signIn';

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

const getRequest = (signUpData: SignUpData): RequestData => {
  return {
    query,
    variables: {
      input: {
        firstName: signUpData.firstName,
        lastName: signUpData.lastName,
        email: signUpData.email,
        pwd: signUpData.pwd,
      },
    },
  };
};

interface SignUpResponse {
  signUp: AuthData;
}

const sendRequest = (signUpData: SignUpData) =>
  Network.post<SignUpResponse>(getRequest(signUpData));

export default sendRequest;
