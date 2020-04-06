import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Layout from '../Layout/Layout';
import initApp from './init';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    initApp(dispatch);
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <Layout />
      </div>
    </BrowserRouter>
  );
}

export default App;
