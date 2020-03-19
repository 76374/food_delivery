import { MENU_RECEIVED } from "../actionTypes";
import { combineObjects } from "../utils";

const initialState = {
    menuData: null
};

const objectToArray = obj => {
    const keys = Object.keys(obj),
        result = [];

    keys.forEach(key => {
        result.push(obj[key]);
    });
    return result;
}

const getMenuData = serverData => {
    console.log(serverData);
    const result = objectToArray(serverData);
    result.forEach(category => {
        category.meals = objectToArray(category.meals);
    });
    return {
        menuData: result
    };
}

const menuReceivedState = (state, serverData) => {
    return combineObjects(state, getMenuData(serverData));
}

export default (state = initialState, action) => {
    switch (action.type) {
        case MENU_RECEIVED: return menuReceivedState(state, action.payload);
        default: return state;
    }
}