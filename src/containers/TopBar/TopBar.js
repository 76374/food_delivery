import React from 'react';
import { useSelector } from 'react-redux';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import styles from './TopBar.module.css';
import {
  ORDER, CHECKOUT, AUTH, LOGOUT,
} from '../../data/appPaths';
import locale from '../../data/locale';
import localeKey from '../../data/localeKey';

const TopBar = () => {
  const authData = useSelector((state) => state.appState.authData);
  const navigationItems = [
    { link: ORDER, text: locale.get(localeKey.TOP_BAR_BT_ORDER) },
    { link: CHECKOUT, text: locale.get(localeKey.TOP_BAR_BT_CHECKOUT) },
    authData
      ? { link: LOGOUT, text: locale.get(localeKey.TOP_BAR_BT_LOGOUT, authData.firstName) }
      : { link: AUTH, text: locale.get(localeKey.TOP_BAR_BT_LOGIN) },
  ];

  return (
    <div className={styles.TopBar}>
      <NavigationBar items={navigationItems} />
    </div>
  );
};

export default TopBar;
