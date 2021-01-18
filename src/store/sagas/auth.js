import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('userId');
    yield localStorage.removeItem('expirationDate');
    yield put(actions.logoutSucceed());
}

export function* authTimeoutSaga(action) {
    yield delay(action.expiresIn * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDNp84bsmW1GAtQEgvaEOeSxbvcPgoob98';
    if (!action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDNp84bsmW1GAtQEgvaEOeSxbvcPgoob98';
    }
    yield put(actions.authStart());
    try{
        const response = yield axios.post(url, authData)
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('userId', response.data.localId);
        localStorage.setItem('expirationDate', expirationDate);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        yield put(actions.authTimeout(response.data.expiresIn));

    }catch(error) {
        yield put(actions.authFail(error.response.data.error));
    } 
}

export function* checkAuthStateSaga(action) {
    const token = localStorage.getItem('token');
        if(token) {
            const userId = localStorage.getItem('userId');
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()){
                const expiresIn = expirationDate.getTime() - new Date().getTime();
                yield put(actions.authSuccess(token, userId));
                yield put(actions.authTimeout(expiresIn/1000));
            }else {
                yield put(actions.logout());
            }
        }else {
            yield put(actions.logout());
        }
}