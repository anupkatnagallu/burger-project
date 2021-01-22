import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

export const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);

    const dispatch = useDispatch();

    const [ingredients, tp, hasError, isAuth] = useSelector(state => {
        return [state.bbr.ingredients,
        state.bbr.totalPrice,
        state.bbr.error,
        state.ar.token !== null]
    })

    const loadIngredients = useCallback(() => dispatch(actions.loadIngredients()), [dispatch]);
    const addIngredient = ingType => dispatch(actions.addIngredient(ingType));
    const removeIngredient = ingType => dispatch(actions.removeIngredient(ingType));
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = path => dispatch(actions.setAuthRedirectPath(path));

    useEffect(() => {
        loadIngredients();
    }, [loadIngredients]);

    const changePurchaseState = (ingredients) => {
        const sum = Object.values(ingredients)
            .reduce((sum, el) => (
                sum + el
            ), 0);

        const purchasable = sum > 0;

        return purchasable;
    }

    const purchasingHandler = () => {
        if (isAuth) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }

    }

    const purchaseCancelledHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
    }

    const disabledInfo = {
        ...ingredients
    }

    for (let ing in disabledInfo) {
        disabledInfo[ing] = disabledInfo[ing] <= 0;
    }

    let orderSummary = null;
    let burger = hasError ? <p>Something went wrong!</p> : <Spinner />;

    if (ingredients) {
        burger =
            <Auxiliary>
                <Burger ingredients={ingredients} />
                <BuildControls ingredientAdded={addIngredient}
                    ingredientRemoved={removeIngredient}
                    disabledInfo={disabledInfo}
                    price={tp}
                    isAuth={isAuth}
                    purchasable={changePurchaseState(ingredients)}
                    orderClick={purchasingHandler} />
            </Auxiliary>;

        orderSummary = <OrderSummary ingredients={ingredients}
            price={tp}
            purchaseCancel={purchaseCancelledHandler}
            purchaseContinue={purchaseContinueHandler} />
    }

    return (
        <Auxiliary>
            <Modal purchasing={purchasing}
                modalClosed={purchaseCancelledHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Auxiliary>
    );
}

export default withErrorHandler(BurgerBuilder, axios);