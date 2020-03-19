import React from 'react';
import MealCard from './MealCard/MealCard';

const Category = props => {
    const items = props.meals.map((item, index) => 
        <MealCard title={item.title} price={item.price} key={'#mealCard' + index}/>
    );
    return (
        <div>
            {items}
        </div>
    );
}

export default Category;