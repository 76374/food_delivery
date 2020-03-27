import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Order from './containers/Order/Order'
import TopBar from './containers/TopBar/TopBar';
import Checkout from './containers/Checkout/Checkout';
import OrderSuccess from './containers/OrderSuccess/OrderSuccess';
import Loading from './components/Loading/Loading';
import ErrorHandler from './containers/ErrorHandler/ErrorHandler';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Logout/Logout';
import { initMenu } from './store/actions/order'
import { ORDER, CHECKOUT, ORDER_SUCCESS, AUTH, LOGOUT } from './store/AppPaths';
import { authSubmited } from './store/actions/appState';


function App() {
  const menuData = useSelector(state => state.order.menuData);
  const loading = useSelector(state => state.appState.loading)

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
        <ErrorHandler />
        {loading ? <Loading /> : null}
        <TopBar />
        <Switch>
          <Route path={ORDER} exact component={menuData ? Order : null} />
          <Route path={CHECKOUT} exact component={Checkout} />
          <Route path={ORDER_SUCCESS} exact component={OrderSuccess} />
          <Route path={AUTH} exact component={Auth} />
          <Route path={LOGOUT} exact component={Logout} />
          <Redirect to={ORDER} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
