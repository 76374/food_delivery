import { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import useStore from '../../hooks/useStore';
import LocalData from '../../utils/LocalData';

const Logout = (props: RouteComponentProps) => {
  const { history } = props;
  const { user } = useStore();
  useEffect(() => {
    LocalData.clearUserData();
    user.signOut();
    
    history.goBack();
  }, [user, history]);

  return null;
};

export default Logout;
