import React from 'react';
import Order from '../Order/Order'
import TopBar from '../TopBar/TopBar';
import Checkout from '../Checkout/Checkout';
import OrderSuccess from '../OrderSuccess/OrderSuccess';
import Loading from '../../components/Loading/Loading';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import Auth from '../Auth/Auth';
import Logout from '../Logout/Logout';
import { ORDER, CHECKOUT, ORDER_SUCCESS, AUTH, LOGOUT } from '../../data/appPaths';
import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router';
import styles from './Layout.module.css'

const Layout = () => {
  const menuData = useSelector(state => state.order.menuData);
  const loading = useSelector(state => state.appState.loading);
  const localeLoaded = useSelector(state => state.appState.localeLoaded);

  if (!localeLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <div className={styles.Layout}>
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
  );
}

export default Layout;