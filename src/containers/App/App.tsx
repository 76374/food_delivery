import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from '../Layout/Layout';
import Locale from '../../utils/Locale';
import useStore from '../../hooks/useStore';
import useInitMenu from '../../hooks/useInitMenu';
import LocalData from '../../utils/LocalData';

const App = () => {
  const { appState, user } = useStore();
  const initMenu = useInitMenu();

  useEffect(() => {
    Locale.init(() => {
      appState.setLocaleReady();
    });
  }, [appState]);

  useEffect(() => {
    const userData = LocalData.readUserData();
    if (userData) {
      user.setUserDetails(userData.firstName, userData.lastName, userData.email);
      user.setToken(userData.token);
    }
  }, [user]);

  useEffect(() => {
    initMenu();
  }, [initMenu]);

  return (
    <BrowserRouter>
      <div className="App">
        <Layout />
      </div>
    </BrowserRouter>
  );
};

export default App;
