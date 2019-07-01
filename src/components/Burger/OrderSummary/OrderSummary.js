import React from 'react';

import Fragment from '../../../Fragment';
import Button from '../../UI/Button/Button';

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
            <p>Total Price:{props.price}</p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType="Success"clicked={props.purchaseContinued}>Continue</Button>
        </Fragment>
    );

 
};

export default orderSummary;