import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    }

    componentDidMount() {

        this.props.loadIngredients();
    }

    changePurchaseState(ingredients) {
        const sum = Object.values(ingredients)
            .reduce((sum, el) => (
                sum + el
            ), 0);

        const purchasable = sum > 0;

        return purchasable;

        // this.setState({
        //     purchasable: purchasable
        // });
    }

    purchasingHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelledHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }

        for (let ing in disabledInfo) {
            disabledInfo[ing] = disabledInfo[ing] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.hasError ? <p>Something went wrong!</p> : <Spinner />;

        if (this.props.ingredients) {
            burger =
                <Auxiliary>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls ingredientAdded={this.props.addIngredient}
                        ingredientRemoved={this.props.removeIngredient}
                        disabledInfo={disabledInfo}
                        price={this.props.tp}
                        purchasable={this.changePurchaseState(this.props.ingredients)}
                        orderClick={this.purchasingHandler} />
                </Auxiliary>;

            orderSummary = <OrderSummary ingredients={this.props.ingredients}
                price={this.props.tp}
                purchaseCancel={this.purchaseCancelledHandler}
                purchaseContinue={this.purchaseContinueHandler} />
        }

        return (
            <Auxiliary>
                <Modal purchasing={this.state.purchasing}
                    modalClosed={this.purchaseCancelledHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.bbr.ingredients,
        tp: state.bbr.totalPrice,
        hasError: state.bbr.error
    };
}

const mapDispatchToProps = dispatch => {
    return {
        loadIngredients: () => dispatch(actions.loadIngredients()),
        addIngredient: ingType => dispatch(actions.addIngredient(ingType)),
        removeIngredient: ingType => dispatch(actions.removeIngredient(ingType)),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));