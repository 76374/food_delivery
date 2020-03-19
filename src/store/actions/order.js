import axios from 'axios';
import { MENU_RECEIVED } from '../actionTypes';

const SERVER_PATH = 'https://food-delivery-14fcc.firebaseio.com';

const menuReceived = serverData => ({
    type: MENU_RECEIVED,
    payload: serverData
});

export const initMenu = () => {
    return dispatch => {
        axios.get(`${SERVER_PATH}/menu.json`, { cache: false })
            .then(response => {
                console.log(response);
                dispatch(menuReceived(response.data));
            });
    }
}
