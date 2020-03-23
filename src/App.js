import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Order from './containers/Order/Order'
import { initMenu } from './store/actions'
import TopBar from './containers/TopBar/TopBar';

function App() {
  const menuData = useSelector(state => state.order.menuData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initMenu());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <TopBar />
        <Switch>
          <Route path="/order" exact component={menuData ? Order : null}/> 
          <Redirect to="/order"/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
