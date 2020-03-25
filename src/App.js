import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Order from './containers/Order/Order'
import TopBar from './containers/TopBar/TopBar';
import Checkout from './containers/Checkout/Checkout';
import OrderSuccess from './containers/OrderSuccess/OrderSuccess';
import { initMenu } from './store/actions/order'
import { ORDER, CHECKOUT, ORDER_SUCCESS } from './store/AppPaths';
import Loading from './components/Loading/Loading';

function App() {
  const menuData = useSelector(state => state.order.menuData);
  const loading = useSelector(state => state.appState.loading)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initMenu());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        {loading ? <Loading /> : null}
        <TopBar />
        <Switch>
          <Route path={ORDER} exact component={menuData ? Order : null} />
          <Route path={CHECKOUT} exact component={Checkout} />
          <Route path={ORDER_SUCCESS} exact component={OrderSuccess} />
          <Redirect to={ORDER} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
