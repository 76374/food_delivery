import React from 'react';
import MealCard from './MealCard/MealCard';
import styles from './Category.module.css';

const Category = props => {
    const items = props.items.map((item, index) => {
        const orderDetails = props.orderedItems.find(orderedItem => orderedItem.itemId === item.id);
        return <MealCard
            title={item.title}
            price={item.price}
            key={'#mealCard' + index}
            itemsCountChanged={count => { props.itemsCountChanged(item.id, count); }}
            orderedCount={orderDetails ? orderDetails.count : 0}
        />
    });
    return (
        <div>
            <h2>{props.title}</h2>
            <div className={styles.Meals}>
                {items}
            </div>
        </div>
    );
}

export default Category;