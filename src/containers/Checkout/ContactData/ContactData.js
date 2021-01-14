import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as orderActions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {checkValidity} from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
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
        },
        isFormValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        const customerData = {};

        for(let key in this.state.orderForm){
            customerData[key] = this.state.orderForm[key].value;
        }

        console.log(this.props);

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: customerData,
            userId: this.props.userId
        };

        this.props.burgerPurchaseStart(order, this.props.token);
    }

    inputChangeHandler(event, inputIdentifier) {
        let updatedOrderForm = {
            ...this.state.orderForm
        }

        let updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;

        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let isFormValid = true;
        for(let key in updatedOrderForm) {
            isFormValid = updatedOrderForm[key].valid && isFormValid;
        }

        this.setState({
            orderForm: updatedOrderForm,
            isFormValid: isFormValid
        })
    }


    render() {
        let formInputs = [];
        for(let key in this.state.orderForm){
            formInputs.push(
                <Input elementType={this.state.orderForm[key].elementType}
                       elementConfig={this.state.orderForm[key].elementConfig}
                       value={this.state.orderForm[key].value}
                       invalid={!this.state.orderForm[key].valid}
                       change={event => this.inputChangeHandler(event, key)}
                       shouldValidate={this.state.orderForm[key].validation}
                       touched={this.state.orderForm[key].touched}
                       key={key}
                />
            );
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formInputs}
                <Button btnType='Success' disabled={!this.state.isFormValid}>ORDER</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data!</h4>
                {form}
            </div>
        );
    }
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
        burgerPurchaseStart:(orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));