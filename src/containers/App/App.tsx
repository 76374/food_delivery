import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from '../Layout/Layout';
import Locale from '../../utils/Locale';
import useStore from '../../hooks/useStore';
import useInitMenu from '../../hooks/useInitMenu';
import useLocalData from '../../hooks/useLocalData';

const App = () => {
  const { appState } = useStore();
  const initMenu = useInitMenu();
  const { checkUserData } = useLocalData();

  useEffect(() => {
    Locale.init(() => {
      appState.setLocaleReady();
    });

    checkUserData();

    initMenu();
  }, [appState, checkUserData, initMenu]);

  return (
    <BrowserRouter>
      <div className="App">
        <Layout />
      </div>
    </BrowserRouter>
  );
}

export default App;
