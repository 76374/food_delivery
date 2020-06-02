import User from '../../stores/User';
import { AuthData } from '../../service/network/signIn';
import LocalData from '../../utils/LocalData';
import UserData from '../../dto/UserData';

const handleAuthData = (userStore: User, authData: AuthData) => {
  const userData: UserData = {
    firstName: authData.user.firstName,
    lastName: authData.user.lastName,
    email: authData.user.email,
    token: authData.token,
  };
  userStore.setUserDetails(userData.firstName, userData.lastName, userData.email);
  userStore.setToken(userData.token);

  LocalData.setUserData(userData);
};

export default handleAuthData;
