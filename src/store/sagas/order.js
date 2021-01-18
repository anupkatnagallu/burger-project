import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions/index';

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart());
    try {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
        yield put(actions.purchaseBurgerSuccess(response.data.name, action.orderData));
    } catch (error) {
        yield put(actions.purchaseBurgerFail(error));
    }
}

export function* getOrdersSaga(action) {
    yield put(actions.fetchOrdersStart());
    const queryparams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';
    try {
        const response = yield axios.get('/orders.json' + queryparams);
        let fetchedOrders = [];
        for (let key in response.data) {
            fetchedOrders.push({
                ...response.data[key],
                id: key
            });
        }
        yield put(actions.fetchOrdersSuccess(fetchedOrders));
    } catch (error) {
        yield put(actions.fetchOrdersFail(error));
    }
}

export function* deleteOrderSaga(action) {
    yield put(actions.deleteStart());
    try {
        yield axios.delete('/orders/' + action.id + '.json?auth=' + action.token);
        yield put(actions.deleteSuccess(action.id));
    } catch (error) {
        yield put(actions.deleteFail());
    }
}