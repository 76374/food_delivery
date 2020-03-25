const objectToArray = obj => {
    const keys = Object.keys(obj),
        result = [];

    keys.forEach(key => {
        obj[key].id = key;
        result.push(obj[key]);
    });
    return result;
};

export const getMenuData = serverData => {
    console.log(serverData);
    const result = objectToArray(serverData);
    result.forEach(category => {
        category.items = objectToArray(category.items);
    });
    console.log(result);
    return {
        menuData: result
    };
}

export const getOrederRequest = orderedItems => {
    const result = {};
    orderedItems.forEach(orderedItem => {
        const catId = orderedItem.categoryId;
        if (result[catId] === undefined) {
            result[catId] = {};
        }
        result[catId][orderedItem.itemId] = orderedItem.count;
    });
    return result;
}