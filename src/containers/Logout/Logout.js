import { useEffect } from 'react';
import useLocalData from '../../hooks/useLocalData';

const Logout = (props) => {
  const { history } = props;
  const localData = useLocalData();
  useEffect(() => {
    localData.clearUserData();
    history.goBack();
  }, [localData, history]);

  return null;
};

export default Logout;
