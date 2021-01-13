import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    componentDidMount() {
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.setAuthRedirectPath();
        }
    }

    checkValidity(value, rule) {
        let isValid = true;

        if (rule.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rule.minLength) {
            isValid = value.length >= rule.minLength && isValid;
        }

        if (rule.maxLength) {
            isValid = value.length <= rule.maxLength && isValid;
        }
        return isValid;
    }

    inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };

        this.setState({
            controls: updatedControls
        });
    }

    onSubmitHandler = event => {
        event.preventDefault();

        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignup: !prevState.isSignup
            }
        })
    }

    render() {

        let formInputs = [];
        for (let key in this.state.controls) {
            formInputs.push(
                <Input elementType={this.state.controls[key].elementType}
                    elementConfig={this.state.controls[key].elementConfig}
                    value={this.state.controls[key].value}
                    invalid={!this.state.controls[key].valid}
                    change={event => this.inputChangeHandler(event, key)}
                    shouldValidate={this.state.controls[key].validation}
                    touched={this.state.controls[key].touched}
                    key={key}
                />
            );
        }
        let form = (
            <form onSubmit={this.onSubmitHandler}>
                {formInputs}
                <Button btnType="Success">SUBMIT</Button>
            </form>
        );
        if(this.props.loading) {
            form = <Spinner />
        }

        let errorMsg = null;
        if(this.props.error){
            errorMsg = (
                <p>{this.props.error.message}</p>
            );
        }
        let redirect = null;
        console.log(this.props.isAuth, this.props.authRedirectPath, this.props.token);
        if(this.props.isAuth){
            redirect = <Redirect to={this.props.authRedirectPath} />
        }
        return (
            <div className={classes.Auth}>
                {redirect}
                {errorMsg}
                {form}
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.ar.loading,
        error: state.ar.error,
        isAuth: state.ar.token !== null,
        token: state.ar.token,
        buildingBurger: state.bbr.building,
        authRedirectPath: state.ar.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        setAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);