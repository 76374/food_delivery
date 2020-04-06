const objectToArray = (obj) => {
  const keys = Object.keys(obj);
  const result = [];

  keys.forEach((key) => {
    obj[key].id = key;
    result.push(obj[key]);
  });
  return result;
};

export const getMenuData = (serverData) => {
  const result = objectToArray(serverData);
  result.forEach((category) => {
    category.items = objectToArray(category.items);
  });
  return {
    menuData: result,
  };
};

export const getOrederRequest = (orderedItems) => {
  const result = {};
  orderedItems.forEach((orderedItem) => {
    const catId = orderedItem.categoryId;
    if (result[catId] === undefined) {
      result[catId] = {};
    }
    result[catId][orderedItem.itemId] = orderedItem.count;
  });
  return result;
};
