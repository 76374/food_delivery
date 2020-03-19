import React from 'react';

const item = props => (
    <div>
        <h1>{props.title}</h1>
        <h2>price: {props.price}</h2>
    </div>
)

export default item;