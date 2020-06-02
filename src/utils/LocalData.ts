import UserData from "../dto/UserData";

const DATA_KEY: string = 'user';

class LocalData {
  static readUserData = (): UserData | null => {
    const dataStr = localStorage.getItem(DATA_KEY);
    return dataStr ? JSON.parse(dataStr) : null;
  };

  static setUserData = (userData: UserData) => {
    localStorage.setItem(DATA_KEY, JSON.stringify(userData));
  };

  static clearUserData = () => {
    localStorage.removeItem(DATA_KEY);
  };
}

export default LocalData;
