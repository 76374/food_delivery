import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Order from './containers/Order/Order'
import { initMenu } from './store/actions'
import TopBar from './containers/TopBar/TopBar';

function App() {
  const menuData = useSelector(state => state.order.menuData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initMenu());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <TopBar/>
      {menuData ? <Order/> : null}
    </div>
  );
}

export default App;
