import React from 'react';
import Category from '../../components/Category/Category';
import useStore from '../../hooks/useStore';
import { observer } from 'mobx-react';

const Order = () => {
  const { order } = useStore();

  const onItemsCountChanged = (categoryId, itemId, count) => {
    order.setOrderedItem(categoryId, itemId, count);
  };

  let key = 0;
  const categories = order.menuData.map((category) => (
    <Category
      items={category.items}
      title={category.title}
      key={`#category${key++}`}
      itemsCountChanged={(itemId, count) => {
        onItemsCountChanged(category.id, itemId, count);
      }}
      orderedItems={order.orderedItems.filter((item) => item.categoryId === category.id)}
    />
  ));
  return <div>{categories}</div>;
};

export default observer(Order);
