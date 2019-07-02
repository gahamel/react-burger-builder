import React from 'react';

import Fragment from '../../../Fragment';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component {
    componentWillUpdate() {
        console.log('[OrderSummary] WillUpdate');
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
            .map(igKey => {
        return <li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>
            })
        return (
            <Fragment>
                <h3>Your Order</h3>
                <p>A delicious burger with this ingredients :</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p>Total Price:{this.props.price}</p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button btnType="Success"clicked={this.props.purchaseContinued}>Continue</Button>
            </Fragment>
        )
    }
};

export default OrderSummary;