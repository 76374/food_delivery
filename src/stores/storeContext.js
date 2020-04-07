import React from 'react';
import OrderStore from './order';

export default React.createContext({
  order: new OrderStore(),
});
