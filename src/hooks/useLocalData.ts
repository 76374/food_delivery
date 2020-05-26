import { useCallback } from 'react';
import useStore from './useStore';

interface LocalDataActions {
  readUserData(): void;
  setUserData(firstName: string, lastName: string, email: string, token: string): void;
  clearUserData(): void;
}

const DATA_KEY: string = 'firstName';

const useLocalData = (): LocalDataActions => {
  const { user } = useStore();

  const readUserData = useCallback(() => {
    const dataStr = localStorage.getItem(DATA_KEY);
    if (dataStr) {
      const data = JSON.parse(dataStr);
      user.setUserDetails(data.firstName, data.lastName, data.email);
      user.setToken(data.token);
    }
  }, [user]);

  const setUserData = useCallback(
    (firstName: string, lastName: string, email: string, token: string) => {
      localStorage.setItem(DATA_KEY, JSON.stringify({ firstName, lastName, email, token }));
      user.setUserDetails(firstName, lastName, email);
      user.setToken(token);
    },
    [user]
  );

  const clearUserData = useCallback(() => {
    localStorage.removeItem(DATA_KEY);
    user.signOut();
  }, [user]);

  return {
    readUserData,
    setUserData,
    clearUserData,
  };
};

export default useLocalData;
