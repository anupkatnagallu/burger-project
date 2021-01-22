import React, { useState } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as orderActions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { checkValidity } from '../../../shared/utility';

const ContactData = props => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Your Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Your E-Mail'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        pincode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'PIN Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    { value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                ]
            },
            value: 'fastest',
            validation: {},
            valid: true
        }
    });
    const [isFormValid, setIsFormValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();

        const customerData = {};

        for (let key in orderForm) {
            customerData[key] = orderForm[key].value;
        }

        const order = {
            ingredients: props.ingredients,
            price: props.price,
            customer: customerData,
            userId: props.userId
        };

        props.burgerPurchaseStart(order, props.token);
    }

    const inputChangeHandler = (event, inputIdentifier) => {
        let updatedOrderForm = {
            ...orderForm
        }

        let updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;

        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let key in updatedOrderForm) {
            formIsValid = updatedOrderForm[key].valid && formIsValid;
        }

        setOrderForm(updatedOrderForm);
        setIsFormValid(formIsValid);
    }

        let formInputs = [];
        for (let key in orderForm) {
            formInputs.push(
                <Input elementType={orderForm[key].elementType}
                    elementConfig={orderForm[key].elementConfig}
                    value={orderForm[key].value}
                    invalid={!orderForm[key].valid}
                    change={event => inputChangeHandler(event, key)}
                    shouldValidate={orderForm[key].validation}
                    touched={orderForm[key].touched}
                    key={key}
                />
            );
        }

        let form = (
            <form onSubmit={orderHandler}>
                {formInputs}
                <Button btnType='Success' disabled={!isFormValid}>ORDER</Button>
            </form>
        );

        if (props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data!</h4>
                {form}
            </div>
        );
}

const mapStateToProps = state => {
    return {
        ingredients: state.bbr.ingredients,
        price: state.bbr.totalPrice,
        loading: state.or.loading,
        token: state.ar.token,
        userId: state.ar.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        burgerPurchaseStart: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));