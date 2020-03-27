import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { initMenu } from './store/actions/order'
import { authSubmited } from './store/actions/appState';
import Layout from './containers/Layout/Layout';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initMenu());

    const firstName = localStorage.getItem('firstName');
    const lastName = localStorage.getItem('lastName');
    if (firstName && lastName) {
      dispatch(authSubmited({ firstName, lastName }))
    }

  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <Layout/>
      </div>
    </BrowserRouter>
  );
}

export default App;
