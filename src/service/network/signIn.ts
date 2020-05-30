import RequestData from '../../dto/RequestData';
import SignInData from '../../dto/SignInData';
import Network from './Network';

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

const getRequest = (signInData: SignInData): RequestData => {
  return {
    query,
    variables: {
      input: {
        email: signInData.email,
        pwd: signInData.pwd,
      },
    },
  };
};

interface SignInResponse {
  signIn: {
    token: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
    };
  };
}

const sendRequest = (signInData: SignInData) =>
  Network.post<SignInResponse>(getRequest(signInData));

export default sendRequest;
