import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderData: orderData,
        orderId: id
    }
}

export const purchaseBurgerFail = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
}

export const purchaseBurger = (orderData, token) => {
    return {
        type: actionTypes.INIT_PURCHASE_BURGER_START,
        orderData: orderData,
        token: token
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
}

 export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const getOrders = (token, userId) => {
    return {
        type: actionTypes.FETCH_ORDERS_INIT,
        token: token,
        userId: userId
    }
}

export const deleteStart = () => {
    return {
        type: actionTypes.DELETE_ORDER_START
    }
}

export const deleteSuccess = (id) => {
    return {
        type: actionTypes.DELETE_ORDER_SUCCESS,
        id: id
    }
}

export const deleteFail = () => {
    return {
        type: actionTypes.DELETE_ORDER_FAIL
    }
}

export const deleteOrder = (token, id) => {
    return {
        type: actionTypes.DELETE_ORDER_INIT,
        token: token,
        id: id
    }
}