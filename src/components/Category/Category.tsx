import React from 'react';
import MealCard from './MealCard/MealCard';
import styles from './Category.module.css';
import { MenuItem } from '../../dto/MenuData';
import OrderedItem from '../../dto/OrderedItem';

interface CategoryProps {
  title: string;
  items: MenuItem[];
  orderedItems: OrderedItem[];
  itemsCountChanged(id: string, count: number): void;
}

const Category = (props: CategoryProps) => {
  const items = props.items.map((item) => {
    const orderedItem = props.orderedItems.find((orderedItem) => orderedItem.itemId === item.id);
    return (
      <MealCard
        title={item.title}
        price={item.price}
        key={`#mealCard${item.id}`}
        itemsCountChanged={(count) => {
          props.itemsCountChanged(item.id, count);
        }}
        orderedCount={orderedItem ? orderedItem.count : 0}
      />
    );
  });
  return (
    <div>
      <h2>{props.title}</h2>
      <div className={styles.Meals}>{items}</div>
    </div>
  );
};

export default Category;
