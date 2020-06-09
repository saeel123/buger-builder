import React , { Component } from 'react';
import axios from '../../../axios-orders'

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { element } from 'prop-types';

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
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        this.setState({loading: true});

        const formData = {};
        for(let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier];
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: formData
        }

        axios.post('/orders.json', order).then(response => {
            this.setState({loading: false});
            this.props.history.push('/');

        }).catch(error => {
            this.setState({loading: false});
            this.props.history.push('/');
        }); 
    }

    inputChangedHadler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm: updatedOrderForm});
    }

    render() {
            const formElementArray = [];
            for(let key in this.state.orderForm) {
                formElementArray.push({
                    id: key,
                    config: this.state.orderForm[key]
                })
            }

            let form =(
                        <form onSubmit={this.orderHandler}>
                            {
                                formElementArray.map(formElement => (
                                    <Input  key={formElement.id}
                                            elementType={formElement.config.elementType} 
                                            elementConfig={formElement.config.elementConfig}  
                                            changed={(event) => this.inputChangedHadler(event, formElement.id)}
                                            value={formElement.config.value}/>
                                ))
                            }
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