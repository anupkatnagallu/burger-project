import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = props => {

    const { getOrders, token, userId } = props;

    useEffect(() => {
        getOrders(token, userId);
    }, [getOrders, token, userId]);

    const deleteOrderHandler = (id) => {
        props.deleteOrder(props.token, id);
    }

    let display = <Spinner />;
    if (!props.loading) {
        display = props.orders.map(order => {
            return <Order key={order.id} ingredients={order.ingredients} price={+order.price} clicked={() => deleteOrderHandler(order.id)} />
        });
    }
    return (
        <div>
            {display}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        orders: state.or.orders,
        loading: state.or.loading,
        token: state.ar.token,
        userId: state.ar.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrders: (token, userId) => dispatch(actions.getOrders(token, userId)),
        deleteOrder: (token, id) => dispatch(actions.deleteOrder(token, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));