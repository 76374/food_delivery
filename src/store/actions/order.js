import axios from 'axios';
import { MENU_RECEIVED, ORDERED_ITEMS_COUNT_CHANGED, ORDER_SENT_SUCCESS } from '../actionTypes';
import { getOrederRequest } from '../utils/data';

const SERVER_PATH = 'https://food-delivery-14fcc.firebaseio.com';
const MENU_PATH = SERVER_PATH + '/menu.json';
const ORDERS_PATH = SERVER_PATH + '/orders.json';

const menuReceived = serverData => ({
    type: MENU_RECEIVED,
    payload: serverData
});

const orderSentSuccess = () => ({
    type: ORDER_SENT_SUCCESS
});

export const initMenu = () => {
    return dispatch => {
        axios.get(MENU_PATH, { cache: false })
            .then(response => {
                dispatch(menuReceived(response.data));
            });
    }
}

export const orderedItemsCountChanged = (categoryId, itemId, count) => ({
    type: ORDERED_ITEMS_COUNT_CHANGED,
    payload: { categoryId, itemId, count }
});

export const orderConfirmed = (orderData) => {
    return dispatch => {
        axios.post(ORDERS_PATH, getOrederRequest(orderData))
            .then(response => {
                console.log(response);
                dispatch(orderSentSuccess());
            });
    }
}
