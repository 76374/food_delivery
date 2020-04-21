import { useEffect } from 'react';
import useLocalData from '../../hooks/useLocalData';
import { RouteComponentProps } from 'react-router';

const Logout = (props: RouteComponentProps) => {
  const { history } = props;
  const { clearUserData } = useLocalData();
  useEffect(() => {
    clearUserData();
    history.goBack();
  }, [clearUserData, history]);

  return null;
};

export default Logout;
