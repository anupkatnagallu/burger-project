import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            };
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            }
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state,
                loading: false
            }

        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.orders,
                loading: false
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            }
        case actionTypes.DELETE_ORDER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.DELETE_ORDER_SUCCESS:
            let ordersCopy = [...state.orders];
            let index = null;
            if (ordersCopy.length > 1) {
                ordersCopy.forEach((order, orderIndex) => {
                    if (order.id === action.id) {
                        index = orderIndex;
                    }
                });

                ordersCopy.splice(index, 1);

            } else {
                ordersCopy = [];
            }

            return {
                ...state,
                loading: false,
                orders: ordersCopy
            }
        case actionTypes.DELETE_ORDER_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}

export default reducer;