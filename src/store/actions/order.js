import axios from 'axios';
import { MENU_RECEIVED, ORDERED_ITEMS_COUNT_CHANGED } from '../actionTypes';

const SERVER_PATH = 'https://food-delivery-14fcc.firebaseio.com';

const menuReceived = serverData => ({
    type: MENU_RECEIVED,
    payload: serverData
});

export const initMenu = () => {
    return dispatch => {
        axios.get(`${SERVER_PATH}/menu.json`, { cache: false })
            .then(response => {
                dispatch(menuReceived(response.data));
            });
    }
}

export const orderedItemsCountChanged = (categoryId, mealId, count) => ({
    type: ORDERED_ITEMS_COUNT_CHANGED,
    payload: { categoryId, mealId, count }
});
