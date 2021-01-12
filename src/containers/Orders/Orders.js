import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.getOrders();
    }

    render() {
        let display = <Spinner />;
        if(!this.props.loading){
            display = this.props.orders.map(order => {
                return <Order key={order.id} ingredients={order.ingredients} price={+order.price}/>
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
        loading: state.or.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOrders:() => dispatch(actions.getOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));