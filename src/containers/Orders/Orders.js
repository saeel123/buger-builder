import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionsCreators from  '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {
        return (
            <div>
                {this.props.orders.map(order => (
                    <Order  key={order.id} 
                            ingredients={order.ingredients} 
                            price={+order.price}  />
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actionsCreators.fetchOrders())
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios));