import React , { Component } from 'react';
import axios from '../../../axios-orders'

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            email: {
                elementType: 'email',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Street'
                },
                value: ''
            },
            postalCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Pincode'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'},
                    ]
                },
                value: ''
            },
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
                            <Input elementType="input" elementConfig="..." value="" />
                            <Input inputtype="input" type="text" name="email" placeholder="Enter Your Email"/>
                            <Input inputtype="input" type="text" name="street" placeholder="Enter Your Street"/>
                            <Input inputtype="input" type="text" name="postalCode" placeholder="Enter Your Postal Code "/>
                            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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