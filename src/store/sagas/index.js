import { takeEvery } from 'redux-saga/effects';
import { logoutSaga, authTimeoutSaga, authUserSaga, checkAuthStateSaga } from './auth';
import { loadIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, getOrdersSaga, deleteOrderSaga } from './order';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, authTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.CHECK_AUTH_STATE, checkAuthStateSaga);
    
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_LOAD_INGREDIENTS, loadIngredientsSaga);
}

export function* watchOrder() {
    yield takeEvery(actionTypes.INIT_PURCHASE_BURGER_START, purchaseBurgerSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS_INIT, getOrdersSaga);
    yield takeEvery(actionTypes.DELETE_ORDER_INIT, deleteOrderSaga);
}