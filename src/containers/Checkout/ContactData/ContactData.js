import React , { Component } from 'react';
import axios from '../../../axios-orders'

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Saeel',
                address: {
                    street: 'test 1',
                    zipcode: '14521',
                    country: 'India'
                },
                email: 'saeelmacman123@gmil.com'
            },
            deliveryMethod: 'fastest'
        }

        axios.post('/orders.json', order).then(response => {
            this.setState({loading: false});
            this.props.history.push('/');

        }).catch(error => {
            this.setState({loading: false});
            this.props.history.push('/');
        }); 
    }

    render() {
            let form =(
                        <form>
                            <input className={classes.Input} type="text" name="name" placeholder="Enter Your Name"/>
                            <input className={classes.Input} type="text" name="email" placeholder="Enter Your Email"/>
                            <input className={classes.Input} type="text" name="street" placeholder="Enter Your Street"/>
                            <input className={classes.Input} type="text" name="postalCode" placeholder="Enter Your Postal Code "/>
                            <Button clicked btnType="Danger">CANCEL</Button>
                            <Button btnType="Success" clicked={this.orderHandler}>SUBMIT</Button>
                        </form>
            );  
                            
            if (this.state.loading) {
                form = <Spinner/>
            }

            return(
                <div className={classes.ContactData}>
                    <h1>Your Details</h1>
                    {form}
                </div>
            )

        }
        
    }


export default ContactData;