import { MENU_RECEIVED, ORDERED_ITEMS_COUNT_CHANGED } from "../actionTypes";
import { combineObjects } from "../utils";

const initialState = {
    menuData: null,
    orderedItems: []
};

const objectToArray = obj => {
    const keys = Object.keys(obj),
        result = [];

    keys.forEach(key => {
        obj[key].id = key;
        result.push(obj[key]);
    });
    return result;
}

const getMenuData = serverData => {
    console.log(serverData);
    const result = objectToArray(serverData);
    result.forEach(category => {
        category.meals = objectToArray(category.meals);
        /* category.meals.forEach(meal => {
            meal.id = category.id + '_' + meal.id;
        })*/
    });
    console.log(result);
    return {
        menuData: result
    };
}

const menuReceivedState = (state, serverData) => {
    return combineObjects(state, getMenuData(serverData));
}

const orderedItemsCountChanged = (state, categoryId, mealId, count) => {
    const index = state.orderedItems.findIndex(el => el.categoryId === categoryId && el.mealId === mealId);
    if (index === -1 && count === 0) {
        return state;
    }
    const orderedItems = [...state.orderedItems];
    if (index === -1) {
        orderedItems.push({ categoryId, mealId, count });
    } else if (count > 0) {
        orderedItems[index].count = count;
    } else {
        orderedItems.splice(index, 1);
    }
    return combineObjects(state, { orderedItems });
}

export default (state = initialState, action) => {
    switch (action.type) {
        case MENU_RECEIVED:
            return menuReceivedState(state, action.payload);
        case ORDERED_ITEMS_COUNT_CHANGED:
            return orderedItemsCountChanged(state, action.payload.categoryId, action.payload.mealId, action.payload.count);
        default: return state;
    }
}