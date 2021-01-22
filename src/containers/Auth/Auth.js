import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { checkValidity } from '../../shared/utility';

const Auth = props => {
    const [authForm, setAuthForm] = useState({
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
    });
    const [isSignup, setIsSignup] = useState(true);

    const { buildingBurger, authRedirectPath, setAuthRedirectPath } = props;

    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/') {
            setAuthRedirectPath();
        }
    }, [buildingBurger, authRedirectPath, setAuthRedirectPath]);

    const inputChangeHandler = (event, controlName) => {
        const updatedControls = {
            ...authForm,
            [controlName]: {
                ...authForm[controlName],
                value: event.target.value,
                valid: checkValidity(event.target.value, authForm[controlName].validation),
                touched: true
            }
        };

        setAuthForm(updatedControls);
    }

    const onSubmitHandler = event => {
        event.preventDefault();

        props.onAuth(authForm.email.value, authForm.password.value, isSignup);
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    }

    let formInputs = [];
    for (let key in authForm) {
        formInputs.push(
            <Input elementType={authForm[key].elementType}
                elementConfig={authForm[key].elementConfig}
                value={authForm[key].value}
                invalid={!authForm[key].valid}
                change={event => inputChangeHandler(event, key)}
                shouldValidate={authForm[key].validation}
                touched={authForm[key].touched}
                key={key}
            />
        );
    }
    let form = (
        <form onSubmit={onSubmitHandler}>
            {formInputs}
            <Button btnType="Success">SUBMIT</Button>
        </form>
    );
    if (props.loading) {
        form = <Spinner />
    }

    let errorMsg = null;
    if (props.error) {
        errorMsg = (
            <p>{props.error.message}</p>
        );
    }
    let redirect = null;
    if (props.isAuth) {
        redirect = <Redirect to={props.authRedirectPath} />
    }
    return (
        <div className={classes.Auth}>
            {redirect}
            {errorMsg}
            {form}
            <Button
                clicked={switchAuthModeHandler}
                btnType="Danger">SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
        </div>
    )
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