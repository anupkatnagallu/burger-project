import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }


    render() {

        let summary = <Redirect to='/' />;

        if (this.props.ingredients) {
            const redirectAfterPurchase = this.props.purchased ? <Redirect to='/' /> : null;
            summary = (
                <div>
                    {redirectAfterPurchase}
                    <CheckoutSummary ingredients={this.props.ingredients}
                        checkoutCancel={this.checkoutCancelHandler}
                        checkoutContinue={this.checkoutContinueHandler} />

                    <Route path={this.props.match.url + '/contact-data'} component={ContactData} />
                </div>
            );
        }
        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.bbr.ingredients,
        purchased: state.or.purchased
    }
}

export default connect(mapStateToProps)(Checkout);