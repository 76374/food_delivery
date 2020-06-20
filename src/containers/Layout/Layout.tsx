import React from 'react';
import { observer } from 'mobx-react';
import { Switch, Route, Redirect } from 'react-router';
import Order from '../Order/Order';
import TopBar from '../TopBar/TopBar';
import Checkout from '../Checkout/Checkout';
import OrderSuccess from '../OrderSuccess/OrderSuccess';
import Loading from '../../components/Loading/Loading';
import ErrorHandler from '../ErrorHandler/ErrorHandler';
import styles from './Layout.module.css';
import useStore from '../../hooks/useStore';
import AppPath from '../../const/AppPath';
import SignInPopup from '../Auth/SignInPopup';
import SignUpPopup from '../Auth/SignUpPopup';

const Layout = () => {
  const { appState } = useStore();

  if (!appState.localeReady) {
    return <Loading />;
  }

  return (
    <div className={styles.Layout}>
      <ErrorHandler />
      {appState.loading ? <Loading /> : null}
      <TopBar />
      <SignUpPopup />
      <SignInPopup />
      <Switch>
        <Route path={AppPath.ORDER} exact component={Order} />
        <Route path={AppPath.CHECKOUT} exact component={Checkout} />
        <Route path={AppPath.ORDER_SUCCESS} exact component={OrderSuccess} />
        <Redirect to={AppPath.ORDER} />
      </Switch>
    </div>
  );
};

export default observer(Layout);
