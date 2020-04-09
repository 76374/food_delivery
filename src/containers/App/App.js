import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from '../Layout/Layout';
import locale from '../../data/locale';
import useStore from '../../hooks/useStore';
import useInitMenu from '../../hooks/useInitMenu';
import useLocalData from '../../hooks/useLocalData';

function App() {
  const { appState } = useStore();
  const initMenu = useInitMenu();
  const localData = useLocalData();

  useEffect(() => {
    locale.init(() => {
      appState.setLocaleReady();
    });

    localData.checkUserData();

    initMenu();
  }, [appState, localData, initMenu]);

  return (
    <BrowserRouter>
      <div className="App">
        <Layout />
      </div>
    </BrowserRouter>
  );
}

export default App;
