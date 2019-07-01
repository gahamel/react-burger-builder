import React from 'react';

import Fragment from '../../../Fragment';

const orderSummary = (props) => {
const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
        return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
    })

    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with this ingredients :</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Fragment>
    );

 
};

export default orderSummary;