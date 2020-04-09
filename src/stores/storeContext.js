import React from 'react';
import OrderStore from './order';
import AppState from './appState';

export default React.createContext({
  order: new OrderStore(),
  appState: new AppState()
});
