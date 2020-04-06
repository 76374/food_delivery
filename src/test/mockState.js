const getCategoryId = (index) => `category_${index}`;
const getCategoryTitle = (index) => `category title ${index}`;
const getItemId = (index) => `item_${index}`;
const getItemTitle = (index) => `item title${index}`;

export const getMenuData = (...itemsCounts) => {
  const menuData = [];
  itemsCounts.forEach((itemsCount, categoryIndex) => {
    menuData.push({
      id: getCategoryId(categoryIndex),
      title: getCategoryTitle(categoryIndex),
      items: [],
    });
    const { items } = menuData[categoryIndex];
    for (let i = 0; i < itemsCount; i++) {
      items.push({
        id: getItemId(i),
        title: getItemTitle(i),
        price: 1,
      });
    }
  });
  return menuData;
};

export const getOrderArgs = (categoryIndex, itemIndex, count) => ({
  categoryIndex,
  itemIndex,
  count,
});

export const getOrderedItems = (...args) => {
  const orderedItems = [];
  args.forEach((arg) => {
    const { categoryIndex, itemIndex, count } = arg;
    orderedItems.push({
      categoryId: getCategoryId(categoryIndex),
      itemId: getItemId(itemIndex),
      count,
    });
  });

  return orderedItems;
};

export const addAuth = (state) => {
  const mockedState = state;
  if (!mockedState.appState) {
    mockedState.appState = {};
  }
  mockedState.appState.authData = {
    firstName: 'first name',
    lastName: 'last name',
  };
};
