import React, { Component } from 'react';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: false
    }

    componentDidMount() {
        this.setState({loading: true});
        axios.get('/orders.json').then(response => {
            const fetchOrders = [];
            for(let key in response.data){
                fetchOrders.push({
                    ...response.data[key],
                    id: key
                })
            }
            this.setState({orders: fetchOrders, loading: false});
            console.log(this.state.orders);
        }).catch(error => {
            this.setState({loading: false});
        })
    }

    render() {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order  key={order.id} 
                            ingredients={order.ingredients} 
                            price={+order.price}  />
                ))}

            </div>
        );
    }
}

export default WithErrorHandler(Orders, axios);