import RequestData from '../../dto/RequestData';
import SignInData from '../../dto/SignInData';
import Network from './Network';

const query = `
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      token
      user {
        id
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

const sendRequest = (signInData: SignInData) =>
  Network.post<SignInResponse>(getRequest(signInData));

interface SignInResponse {
  signIn: AuthData;
}

export interface AuthData {
  token: string;
  user: UserDetails;
}

export interface UserDetails {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export default sendRequest;
