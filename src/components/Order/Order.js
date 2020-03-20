import React from 'react';
import Category from './Category/Category';

const order = props => {
    if (!props.categories) {
        return null;
    }
    const categories = props.categories.map((category, index) => 
        <Category meals={category.meals} title={category.title} key={'#category' + index}/>
    );
    return (
        <div>
            {categories}
        </div>
    );
}

export default order;