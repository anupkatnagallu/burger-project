import React from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from './ContactData/ContactData';

const Checkout = props => {

    const checkoutCancelHandler = () => {
        props.history.goBack();
    }

    const checkoutContinueHandler = () => {
        props.history.replace('/checkout/contact-data');
    }



    let summary = <Redirect to='/' />;

    if (props.ingredients) {
        const redirectAfterPurchase = props.purchased ? <Redirect to='/' /> : null;
        summary = (
            <div>
                {redirectAfterPurchase}
                <CheckoutSummary ingredients={props.ingredients}
                    checkoutCancel={checkoutCancelHandler}
                    checkoutContinue={checkoutContinueHandler} />

                <Route path={props.match.url + '/contact-data'} component={ContactData} />
            </div>
        );
    }
    return summary;
}

const mapStateToProps = state => {
    return {
        ingredients: state.bbr.ingredients,
        purchased: state.or.purchased
    }
}

export default connect(mapStateToProps)(Checkout);