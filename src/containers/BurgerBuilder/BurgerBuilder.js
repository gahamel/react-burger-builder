import React, {Component} from 'react';
import {connect} from 'react-redux';

import Fragment from '../../Fragment';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../components/UI/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';




class BurgerBuilder extends Component {
    state = {
        purchasable:false,
        purchasing:false,
        loading:false,
    }

    componentDidMount () {
        axios.get('https://burger-builder-5990a.firebaseio.com/Ingredients.json')
        .then(response => {
            this.setState({ingredients:response.data})
        });
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    purchaseHandler = () => {
        this.setState({purchasing:true});
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum,el)=> {
                return sum + el;
            },0);
        return sum > 0;
    }

    render(){
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = <h1><Spinner /></h1>;

        if (this.props.ings) {
            burger = (
                <Fragment>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    ingredientAdded={this.props.OnIngredientAdded}
                    ingredientRemoved={this.props.OnIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler}
                    price={this.props.price} />
                </Fragment>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.props.price} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Fragment>
                <Modal  show={this.state.purchasing}
                        modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price:state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        OnIngredientAdded: (ingName) => dispatch({type:actionTypes.ADD_INGREDIENT, ingredientName:ingName}),
        OnIngredientRemoved: (ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT, ingredientName:ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, axios));