import React from 'react';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import styles from './TopBar.module.css';
import { ORDER, CHECKOUT, AUTH, LOGOUT } from '../../data/appPaths';
import locale from '../../data/locale';
import localeKey from '../../data/localeKey';
import useStore from '../../hooks/useStore';
import { observer } from 'mobx-react';

const TopBar = () => {
  const { appState } = useStore();
  const navigationItems = [
    { link: ORDER, text: locale.get(localeKey.TOP_BAR_BT_ORDER) },
    { link: CHECKOUT, text: locale.get(localeKey.TOP_BAR_BT_CHECKOUT) },
    appState.authData
      ? { link: LOGOUT, text: locale.get(localeKey.TOP_BAR_BT_LOGOUT, appState.authData.firstName) }
      : { link: AUTH, text: locale.get(localeKey.TOP_BAR_BT_LOGIN) },
  ];

  return (
    <div className={styles.TopBar}>
      <NavigationBar items={navigationItems} />
    </div>
  );
};

export default observer(TopBar);
