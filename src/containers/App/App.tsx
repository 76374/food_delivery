import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from '../Layout/Layout';
import Locale from '../../service/Locale';
import useStore from '../../hooks/useStore';
import LocalData from '../../utils/LocalData';
import sendMenuRequest from '../../service/network/getMenu';

const App = () => {
  const { appState, user, order } = useStore();

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
    sendMenuRequest()
      .then((response) => {
        const menuData = response.menu.map((cat) => ({
          id: cat.title,
          title: cat.title,
          items: [...cat.items],
        }));
        order.setMenuData(menuData);
      })
      .catch((err) => {
        appState.setError(err);
      });
  }, [appState, order]);

  return (
    <BrowserRouter>
      <div className="App">
        <Layout />
      </div>
    </BrowserRouter>
  );
};

export default App;
