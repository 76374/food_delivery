import React from 'react';
import MealCard from './MealCard/MealCard';
import styles from './Category.module.css';

const Category = props => {
    const items = props.meals.map((item, index) => 
        <MealCard title={item.title} price={item.price} key={'#mealCard' + index}/>
    );
    return (
        <div>
            <p1>{props.title}</p1>
            <div className={styles.Meals}>
                {items}
            </div>
        </div>
    );
}

export default Category;