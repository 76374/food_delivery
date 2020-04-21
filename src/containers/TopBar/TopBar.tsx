import React from 'react';
import NavigationBar, { NavigationItemData } from '../../components/NavigationBar/NavigationBar';
import styles from './TopBar.module.css';
import AppPath from '../../const/AppPath';
import Locale from '../../utils/Locale';
import LocaleKey from '../../const/LocaleKey';
import useStore from '../../hooks/useStore';
import { observer } from 'mobx-react';

const getItemData = (link: string, text: string) => ({ link, text });

const TopBar = () => {
  const { appState } = useStore();
  const navigationItems: NavigationItemData[] = [
    getItemData(AppPath.ORDER, Locale.get(LocaleKey.TOP_BAR_BT_ORDER)),
    getItemData(AppPath.CHECKOUT, Locale.get(LocaleKey.TOP_BAR_BT_CHECKOUT)),
    appState.authData
      ? getItemData(AppPath.LOGOUT, Locale.get(LocaleKey.TOP_BAR_BT_LOGOUT, appState.authData.firstName))
      : getItemData(AppPath.AUTH, Locale.get(LocaleKey.TOP_BAR_BT_LOGIN))
  ];

  return (
    <div className={styles.TopBar}>
      <NavigationBar items={navigationItems} />
    </div>
  );
};

export default observer(TopBar);
