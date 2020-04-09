import React from 'react';
import { observer } from 'mobx-react';
import { Switch, Route, Redirect } from 'react-router';
import Order from '../Order/Order';
import TopBar from '../TopBar/TopBar';
import Checkout from '../Checkout/Checkout';
import OrderSuccess from '../OrderSuccess/OrderSuccess';
import Loading from '../../components/Loading/Loading';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import Auth from '../Auth/Auth';
import Logout from '../Logout/Logout';
import { ORDER, CHECKOUT, ORDER_SUCCESS, AUTH, LOGOUT } from '../../data/appPaths';
import styles from './Layout.module.css';
import useStore from '../../hooks/useStore';

const Layout = observer(() => {
  const { appState, order } = useStore();

  if (!appState.localeReady) {
    return <Loading />;
  }

  return (
    <div className={styles.Layout}>
      <ErrorHandler />
      {appState.loading ? <Loading /> : null}
      <TopBar />
      <Switch>
        <Route path={ORDER} exact component={order.menuData ? Order : null} />
        <Route path={CHECKOUT} exact component={Checkout} />
        <Route path={ORDER_SUCCESS} exact component={OrderSuccess} />
        <Route path={AUTH} exact component={Auth} />
        <Route path={LOGOUT} exact component={Logout} />
        <Redirect to={ORDER} />
      </Switch>
    </div>
  );
});

export default Layout;
