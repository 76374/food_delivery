import { useCallback } from 'react';
import useStore from './useStore';

const FIRST_NAME_KEY = 'firstName';
const LAST_NAME_KEY = 'lastName';

const useLocalData = () => {
  const { appState } = useStore();

  const checkUserData = useCallback(() => {
    const firstName = localStorage.getItem(FIRST_NAME_KEY);
    const lastName = localStorage.getItem(LAST_NAME_KEY);
    if (firstName && lastName) {
      appState.setAuthData(firstName, lastName);
    }
  }, [appState]);

  const setUserData = useCallback((firstName, lastName) => {
    localStorage.setItem(FIRST_NAME_KEY, firstName);
    localStorage.setItem(LAST_NAME_KEY, lastName);
    appState.setAuthData(firstName, lastName);
  }, [appState]);

  const clearUserData = useCallback(() => {
    localStorage.removeItem(FIRST_NAME_KEY);
    localStorage.removeItem(LAST_NAME_KEY);
    appState.clearAuthData();
  }, [appState]);

  return {
    checkUserData,
    setUserData,
    clearUserData
  };
};

export default useLocalData;
