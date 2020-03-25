import React from 'react';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';
import { useDispatch, useSelector } from 'react-redux';
import { errorOccured } from '../../store/actions/appState';

const ErrorHandler = () => {
    const error = useSelector(state => state.appState.error);
    const dispatch = useDispatch();

    if (!error) {
        return null;
    }

    const onOkClicked = () => {
        dispatch(errorOccured(null));
    }

    return (
        <ErrorPopup 
            message={error.message}
            onOkClicked={onOkClicked}
        />
    );
};

export default ErrorHandler;