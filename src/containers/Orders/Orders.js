import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.getOrders(this.props.token, this.props.userId);
    }

    deleteOrderHandler = (id) => {
        this.props.deleteOrder(this.props.token, id);
    }

    render() {
        let display = <Spinner />;
        if(!this.props.loading){
            display = this.props.orders.map(order => {
                return <Order key={order.id} ingredients={order.ingredients} price={+order.price} clicked={() => this.deleteOrderHandler(order.id)}/>
            });
        }
        return (
            <div>
                {display}
            </div>
        );
    }
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
        getOrders:(token, userId) => dispatch(actions.getOrders(token, userId)),
        deleteOrder: (token, id) => dispatch(actions.deleteOrder(token, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));