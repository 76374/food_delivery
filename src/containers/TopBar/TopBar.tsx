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
  const { user } = useStore();
  const navigationItems: NavigationItemData[] = [
    getItemData(AppPath.ORDER, Locale.get(LocaleKey.TOP_BAR_BT_ORDER)),
    getItemData(AppPath.CHECKOUT, Locale.get(LocaleKey.TOP_BAR_BT_CHECKOUT)),
  ];
  if (user.isSignedIn) {
    navigationItems.push(
      getItemData(AppPath.LOGOUT, Locale.get(LocaleKey.TOP_BAR_BT_LOGOUT, String(user.firstName)))
    );
  } else {
    navigationItems.push(
      getItemData(AppPath.SIGN_IN, Locale.get(LocaleKey.TOP_BAR_BT_SIGN_IN)),
      getItemData(AppPath.SIGN_UP, Locale.get(LocaleKey.TOP_BAR_BT_SIGN_UP))
    );
  }

  return (
    <div className={styles.TopBar}>
      <NavigationBar items={navigationItems} />
    </div>
  );
};

export default observer(TopBar);
