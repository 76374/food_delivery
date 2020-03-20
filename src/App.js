import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Order from './components/Order/Order'
import { initMenu } from './store/actions'

function App() {
  const menuData = useSelector(state => state.order.menuData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initMenu());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {menuData ? <Order categories={menuData}/> : null}
    </div>
  );
}

export default App;
