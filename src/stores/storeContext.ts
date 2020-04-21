import React from 'react';
import OrderStore from './Order';
import AppState from './AppState';

interface StoreContext {
  order: OrderStore;
  appState: AppState;
}

export default React.createContext({
  order: new OrderStore(),
  appState: new AppState()
});
