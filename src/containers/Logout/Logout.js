import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/appState';

const Logout = (props) => {
  const { history } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    dispatch(logout());
    props.history.goBack();
  }, [dispatch, history]);

  return null;
};

export default Logout;
