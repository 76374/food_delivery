import RequestData from '../../dto/RequestData';
import SignUpData from '../../dto/SignUpData';
import Network from './Network';

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
  signUp: {
    token: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
}

const sendRequest = (signUpData: SignUpData) =>
  Network.post<SignUpResponse>(getRequest(signUpData));

export default sendRequest;
