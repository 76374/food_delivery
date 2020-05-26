import React from 'react';
import OrderStore from './Order';
import AppState from './AppState';
import User from './User';

export default React.createContext({
  order: new OrderStore(),
  appState: new AppState(),
  user: new User()
});
