import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/actions/appState';

const Logout = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        localStorage.removeItem('firstName'); 
        localStorage.removeItem('lastName'); 
        dispatch(logout());
        props.history.goBack();
    }, [dispatch, props.history]);

    return null;
}

export default Logout;